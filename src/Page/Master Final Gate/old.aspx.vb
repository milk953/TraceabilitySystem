Imports System.IO
Imports System.Data
Imports System.Globalization
Imports SMT_Serial_Trace.cDBCommon

Public Class frm_ScanSMTSerialPcsNG
    Inherits System.Web.UI.Page
#Region "Event Method"
    Dim _strTagNewLine As String = "/"
    Dim _strEventArgument As String = ""

    Dim DUPLICATE_CHECK_FLG As String = System.Configuration.ConfigurationSettings.AppSettings("DUPLICATE_CHECK_FLG")   'Miya ADD 2016/03/03

    Dim FINAL_GATE_SPECIAL_FLG As String = System.Web.HttpUtility.HtmlDecode(System.Configuration.ConfigurationSettings.AppSettings("FINAL_GATE_SPECIAL_FLG"))
    Dim FINAL_GATE_SPECIAL_PRD As String = System.Web.HttpUtility.HtmlDecode(System.Configuration.ConfigurationSettings.AppSettings("FINAL_GATE_SPECIAL_PRD"))
    Dim FINAL_GATE_SPECIAL_SERIAL_VAR As String = System.Web.HttpUtility.HtmlDecode(System.Configuration.ConfigurationSettings.AppSettings("FINAL_GATE_SPECIAL_SERIAL_VAR"))
    Dim FINAL_GATE_SPECIAL_MESSAGE As String = System.Web.HttpUtility.HtmlDecode(System.Configuration.ConfigurationSettings.AppSettings("FINAL_GATE_SPECIAL_MESSAGE"))
    Dim FINAL_GATE_SPECIAL_OK As String = System.Web.HttpUtility.HtmlDecode(System.Configuration.ConfigurationSettings.AppSettings("FINAL_GATE_SPECIAL_OK"))
    Dim FINAL_GATE_SPECIAL_QUERY As String = System.Web.HttpUtility.HtmlDecode(System.Configuration.ConfigurationSettings.AppSettings("FINAL_GATE_SPECIAL_QUERY"))
    Dim FINAL_GATE_MASTER_CODE As String = System.Web.HttpUtility.HtmlDecode(System.Configuration.ConfigurationSettings.AppSettings("FINAL_GATE_MASTER_CODE"))


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Session.Timeout Then
            Session.RemoveAll()
            Session("COMPANY_CODE") = ConfigurationManager.AppSettings("COMPANY_CODE")
            Session("PLANT_CODE") = ConfigurationManager.AppSettings("PLANT_CODE")
            Session("IP_ADDRESS") = Request.ServerVariables("REMOTE_ADDR")
            Session("PRODUCT_KIND") = "SMT"
        End If
        If Not IsPostBack() Then
            hfUserID.Value = Trim(CStr(Session("IP_ADDRESS")))
            hfUserStation.Value = Trim(CStr(Session("IP_ADDRESS")))

            hfMode.Value = ""
            hfLotAll.Value = ""
            ddlProduct.DataTextField = "PRD_NAME"
            ddlProduct.DataValueField = "PRD_NAME"
            ddlProduct.DataSource = GetProductData(Session("PLANT_CODE"), Session("PRODUCT_KIND"))
            ddlProduct.DataBind()
            getProductSerialMaster()
            SetMode("LOT")
        Else
            _strEventArgument = Me.Request.Params("__EVENTARGUMENT")
            If (_strEventArgument = "Save") Then
                '''' Sucha Modify 31-Aug-2016
                ''''setSerialData()

                setSerialDataTray()
                ''''''''''''''''''''''''''''''
            End If

        End If
    End Sub

    Protected Sub ibtBack_Click(ByVal sender As Object, ByVal e As System.Web.UI.ImageClickEventArgs) Handles ibtback.Click
        ddlProduct.Enabled = True
        txtLot.Text = ""
        txtLot.Enabled = True
        txtLot.CssClass = "styleEnable"
        pnlSerial.Visible = False
        SetMode("LOT")
        fnSetFocus("txtLot")

    End Sub


    Protected Sub txtLot_TextChanged(ByVal sender As Object, ByVal e As EventArgs) Handles txtLot.TextChanged
        If txtLot.Text.Trim.ToUpper <> "" Then
            Dim _strPrdName As String = ""
            Dim _strLot As String = ""
            Dim _strLotAll() As String = Trim(txtLot.Text.Trim.ToUpper).Split(";"c)
            If _strLotAll.GetUpperBound(0) >= 2 Then

                _strLot = _strLotAll(0)
                _strPrdName = ddlProduct.SelectedValue
                hfTestResultFlag.Value = "Y"

                If _strLot.Length = 9 Then
                    _strPrdName = BIZ_ScanSMTSerial.GetProductNameByLot(_strLot)

                    Dim dtLotPassCount As New DataTable
                    dtLotPassCount = BIZ_ScanSMTSerial.GetSerialPassByLot(Session("PLANT_CODE"), _strLot, Session("PRODUCT_KIND"))
                    lblLotTotal.Text = "0"
                    lblSerialNG.Text = "0"
                    If dtLotPassCount.Rows.Count > 0 Then
                        lblLotTotal.Text = dtLotPassCount.Rows(0)("LOT_COUNT").ToString
                    End If

                    Dim dtLotProduct As New DataTable
                    dtLotProduct = BIZ_ScanSMTSerial.GetProductDataByLot(_strLot)
                    If dtLotProduct.Rows.Count > 0 Then
                        If dtLotProduct.Rows(0)("LOT_EN") = "Y" Then
                            hfTestResultFlag.Value = "N"
                        End If
                        hfLotAll.Value = dtLotProduct.Rows(0)("LOT_ALL")
                    End If
                    lblLot.Text = _strLot

                    Try
                        ddlProduct.SelectedValue = _strPrdName
                        getProductSerialMaster()
                        SetMode("SERIAL")


                    Catch ex As Exception
                        Dim intProduct As Integer = InStr(13, _strPrdName, "-", CompareMethod.Text)

                        If InStr(13, _strPrdName, "-", CompareMethod.Text) > 0 Then

                            _strPrdName = Mid(_strPrdName, 1, InStr(13, _strPrdName, "-", CompareMethod.Text) - 1) + Mid(_strPrdName, InStr(13, _strPrdName, "-", CompareMethod.Text) + 1, 10).Trim
                            Try
                                ddlProduct.SelectedValue = _strPrdName

                                getProductSerialMaster()
                                SetMode("SERIAL")

                            Catch ex2 As Exception
                                lblLog.Text = "Product " + _strPrdName + " not found."
                                pnlLog.Visible = True
                                getProductSerialMaster()
                                fnSetFocus("ddlProduct")
                            End Try
                        Else

                            lblLog.Text = "Product " + _strPrdName + " not found."
                            pnlLog.Visible = True
                            getProductSerialMaster()
                            fnSetFocus("ddlProduct")
                        End If

                    End Try

                Else
                    lblLog.Text = _strLot + " invalid lot no.!" + _strTagNewLine + _strLot + " หมายเลขล็อตไม่ถูกต้อง"
                    lblLot.Text = ""
                    lblLotTotal.Text = ""
                    lblSerialNG.Text = ""
                    SetMode("LOT_ERROR")

                End If

            Else
                lblLog.Text = " Please scan QR Code!" + _strTagNewLine + " กรุณาสแกนที่คิวอาร์โค้ด"
                lblLot.Text = ""
                lblLotTotal.Text = ""
                lblSerialNG.Text = ""
                SetMode("LOT_ERROR")
            End If
        Else
            lblLot.Text = ""
            fnSetFocus("txtLot")
        End If
    End Sub

    Protected Sub btnCancel_Click(ByVal sender As Object, ByVal e As EventArgs) Handles btnCancel.Click
        SetMode("SERIAL")
    End Sub

    Protected Sub btnSave_Click(ByVal sender As Object, ByVal e As EventArgs) Handles btnSave.Click
        If (_strEventArgument <> "Save") And hfMode.Value = "SERIAL" Then
            '''' Sucha Modify 31-Aug-2016
            ''''setSerialData()

            setSerialDataTray()
            ''''''''''''''''''''''''''''''
        End If
    End Sub


    Private Sub gvScanResult_RowDataBound(ByVal sender As Object, ByVal e As System.Web.UI.WebControls.GridViewRowEventArgs) Handles gvScanResult.RowDataBound
        If e.Row.RowType = DataControlRowType.DataRow Then
            If e.Row.Cells(6).Text = "NG" Then
                e.Row.ForeColor = Drawing.Color.Red
            End If
        End If
    End Sub


    Protected Sub ddlProduct_SelectedIndexChanged(ByVal sender As Object, ByVal e As EventArgs) Handles ddlProduct.SelectedIndexChanged
        getProductSerialMaster()
        If lblLot.Text <> "" Then
            getProductSerialMaster()
            SetMode("SERIAL")
        Else
            SetMode("LOT")
        End If
    End Sub


    Protected Sub txtMasterCode_TextChanged(sender As Object, e As EventArgs) Handles txtMasterCode.TextChanged
        If txtMasterCode.Text.Trim = FINAL_GATE_MASTER_CODE Then
            pnlLog.Visible = False
            lblLog.Text = ""
            fnSetFocus("gvSerial_txtSerial_0")
        Else
            pnlLog.Visible = True
            lblLog.Text = "Scan master code incorrect" + _strTagNewLine + " สแกน master code ไม่ถูกต้อง"
            txtMasterCode.Text = ""
            fnSetFocus("txtMasterCode")
        End If
    End Sub

    Protected Sub btnHidden_Click(ByVal sender As Object, ByVal e As EventArgs) Handles btnHidden.Click
        DownloadCSV()
    End Sub

#End Region

#Region "Page Function"

    Function fnSetFocus(ByVal _strControl As String) As Integer
        Dim SJscript As String = "<script language='javascript'>" & _
                                 " document.getElementById('" + _strControl + "').focus();  " & _
                                 "</script>"
        Page.RegisterStartupScript("ControlScript", SJscript)
        Return 0
    End Function


    Function SetMode(ByVal _strType As String) As Integer
        Select Case _strType
            Case "LOT"
                txtLot.Text = ""
                txtLot.Enabled = True
                txtLot.CssClass = "styleEnable"

                txtMasterCode.Text = ""

                lblLot.Text = ""
                lblLotTotal.Text = ""
                lblSerialNG.Text = ""
                pnlLog.Visible = False
                pnlSerial.Visible = False
                gvSerial.DataSource = Nothing
                gvSerial.DataBind()

                fnSetFocus("txtLot")

            Case "LOT_ERROR"
                txtLot.Text = ""
                txtLot.Enabled = True
                txtLot.CssClass = "styleEnable"

                txtMasterCode.Text = ""
                lblLot.Text = ""
                lblLotTotal.Text = ""
                lblSerialNG.Text = ""
                pnlLog.Visible = True
                pnlSerial.Visible = False

                hfMode.Value = "LOT"
                fnSetFocus("txtLot")
            Case "TRAY"
                txtLot.Enabled = False
                txtLot.CssClass = "styleDisable"
                lblSerialNG.Text = ""
                pnlLog.Visible = False
                pnlSerial.Visible = True
                getInitialSerial()
                hfMode.Value = "TRAY"
                fnSetFocus("txtTray")

            Case "TRAY_ERROR"
                txtLot.Enabled = False
                txtLot.CssClass = "styleDisable"
                lblSerialNG.Text = ""
                pnlLog.Visible = True
                pnlSerial.Visible = False
                hfMode.Value = "TRAY"
                fnSetFocus("txtTray")

            Case "SERIAL"
                'ddlProduct.Enabled = True
                txtMasterCode.Text = ""
                txtLot.Enabled = False
                txtLot.CssClass = "styleDisable"
                pnlLog.Visible = False
                pnlSerial.Visible = True
                hfMode.Value = "SERIAL"
                getInitialSerial()
                fnSetFocus("txtMasterCode")

            Case "SERIAL_ERROR"
                txtLot.Enabled = False
                txtLot.CssClass = "styleDisable"
                pnlLog.Visible = True


            Case "SERIAL_OK"
                txtLot.Enabled = False
                txtLot.CssClass = "styleDisable"
                pnlLog.Visible = False
                pnlSerial.Visible = True
                getInitialSerial()
                fnSetFocus("gvSerial")

            Case "SERIAL_NG"
                txtLot.Enabled = False
                txtLot.CssClass = "styleDisable"
                pnlLog.Visible = False


        End Select

        Return 0
    End Function

    Function getInitialSerial() As Integer
        Dim dtData As New DataTable
        dtData.Columns.Add(New DataColumn("SEQ", Type.GetType("System.Double")))
        For intRow As Integer = 1 To CInt(hfSerialCount.Value)
            Dim drRow As DataRow
            drRow = dtData.NewRow
            drRow("SEQ") = intRow
            dtData.Rows.Add(drRow)
        Next
        gvSerial.DataSource = dtData
        gvSerial.DataBind()

        'If gvSerial.Rows.Count > 0 And hfTrayFlag.Value = "N" Then
        '    fnSetFocus("gvSerial_txtSerial_0")
        'End If
        Return 0
    End Function


    'Function setSerialData() As Integer

    '    Dim dtSerial As DataTable = getInputSerial()
    '    Dim _strLot As String = lblLot.Text.Trim.ToUpper
    '    Dim _strPrdName As String = ddlProduct.SelectedValue
    '    Dim _strTray As String = " "
    '    Dim _bolTrayError As Boolean = False
    '    Dim _bolError As Boolean = False
    '    Dim _strScanResultAll As String = "OK"


    '    If Not _bolTrayError Then

    '        For Each drRow As DataRow In dtSerial.Rows
    '            If drRow("SERIAL").ToString.Trim <> "" Then
    '                Dim _intCount As Integer = 0
    '                Dim _intCountOK As Integer = 0
    '                Dim _intCountNG As Integer = 0
    '                Dim _intCountDup As Integer = 0
    '                Dim _strRemark As String = ""
    '                Dim _strError As String = ""
    '                Dim _strSerial As String = drRow("SERIAL").ToString.Trim.ToUpper
    '                Dim _dtSerialAll As New DataTable
    '                Dim _bolScanDouble As Boolean = False
    '                Dim _bolScanDuplicate As Boolean = False
    '                Dim _strPrdNameOrg As String = ""
    '                Dim _strLotOrg As String = ""
    '                Dim _strTrayOrg As String = ""
    '                Dim _strTestResultOrg As String = ""
    '                Dim _strOK As String = "OK"
    '                Dim _strNG As String = "NG"
    '                Dim _strScanResultUpdate As String = ""
    '                Dim _strMessageUpdate As String = ""
    '                Dim _strTestResultUpdate As String = ""
    '                Dim _strTypeTestResult As String = ""
    '                Dim _strRejectUpdate As String = ""
    '                Dim _strReject1 As String = ""
    '                Dim _strReject2 As String = ""
    '                Dim _strTouchUp As String = ""

    '                _bolError = False

    '                Dim _strTestResult As String = "NO"
    '                If hfTestResultFlag.Value = "Y" Then
    '                    _strTestResult = BIZ_ScanSMTSerial.GetSerialTestResultMany(Session("PLANT_CODE"), _strPrdName, _strSerial, _strTypeTestResult, Session("PRODUCT_KIND"))
    '                    drRow("TEST_RESULT") = _strTestResult
    '                    BIZ_ScanSMTSerial.GetSerialTouchUpData(Session("PLANT_CODE"), _strSerial, _strReject1, _strRejectUpdate, _strReject2, _strTouchUp, Session("PRODUCT_KIND"))

    '                End If

    '                If DUPLICATE_CHECK_FLG = "1" Then   'Miya ADD 2016/03/03
    '                    _intCountDup = BIZ_ScanSMTSerial.GetSerialDuplicate(Session("PLANT_CODE"), Mid(_strSerial, CInt(hfDuplicateStart.Value), ((CInt(hfDuplicateEnd.Value) - CInt(hfDuplicateStart.Value)) + 1)), Session("PRODUCT_KIND"))
    '                End If                              'Miya ADD 2016/03/03

    '                '''''' Check format serial no '''''''
    '                If _strSerial.Length = CInt(hfSerialLength.Value) Then
    '                    Dim _strFixDigit As String = ""

    '                    If hfSerialFixFlag.Value = "Y" Then
    '                        _strFixDigit = Mid(_strSerial, CInt(hfSerialStartDigit.Value), (CInt(hfSerialEndDigit.Value) - CInt(hfSerialStartDigit.Value)) + 1)

    '                        If _strFixDigit <> hfSerialDigit.Value Then
    '                            _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
    '                            _strRemark = "Serial barcode mix product"
    '                            _strScanResultUpdate = "NG"
    '                            _strTestResultUpdate = _strTestResult
    '                            _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                            _intCountNG = 1
    '                            _bolError = True
    '                        End If

    '                        If hfConfigCheck.Value = "Y" And _bolError = False Then
    '                            Dim _strConfigDigit As String = ""
    '                            _strConfigDigit = Mid(_strSerial, CInt(hfConfigStart.Value), (CInt(hfConfigEnd.Value) - CInt(hfConfigStart.Value)) + 1)
    '                            If _strConfigDigit <> hfConfigCode.Value Then
    '                                _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
    '                                _strRemark = "Serial barcode mix product"
    '                                _strScanResultUpdate = "NG"
    '                                _strTestResultUpdate = _strTestResult
    '                                _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                                _intCountNG = 1
    '                                _bolError = True
    '                            End If
    '                        End If

    '                    End If

    '                    If Not _bolError Then
    '                        If hfTestResultFlag.Value = "Y" Then
    '                            If _strTouchUp = "NG" Then
    '                                If _strTestResult = "OK" Then
    '                                    _strMessageUpdate = "Touch up result was fail " + _strTagNewLine + "ผล Touch up ชิ้นงานแสดงไม่ผ่าน"
    '                                Else
    '                                    _strMessageUpdate = "Touch up result was fail " + _strTypeTestResult + _strTagNewLine + "ผล Touch up ชิ้นงานแสดงไม่ผ่าน " + _strTypeTestResult
    '                                End If
    '                                _strRemark = "Touch up result was fail" + _strTypeTestResult
    '                                _strScanResultUpdate = "NG"
    '                                _strTestResultUpdate = _strTestResult
    '                                _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                                _bolError = True
    '                            ElseIf _strTouchUp = "NO" Then
    '                                If _strTestResult = "OK" Then
    '                                    _strMessageUpdate = "Not found touch up result " + _strTagNewLine + "ไม่พบผล Touch up ชิ้นงาน"
    '                                Else
    '                                    _strMessageUpdate = "Not found touch up result " + _strTypeTestResult + _strTagNewLine + "ไม่พบผล Touch up ชิ้นงาน " + _strTypeTestResult
    '                                End If
    '                                _strRemark = "Not found touch up result"
    '                                _strScanResultUpdate = "NG"
    '                                _strTestResultUpdate = _strTestResult
    '                                _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                                _bolError = True

    '                            ElseIf _strTestResult = "OK" Then

    '                                If _intCountDup = 0 Then
    '                                    _strScanResultUpdate = "OK"
    '                                    _strTestResultUpdate = _strTestResult
    '                                    _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                                Else

    '                                    _strMessageUpdate = "Duplicate scan serial " + _strTypeTestResult + _strTagNewLine + "แสกนบาร์โค้ดของชิ้นงานซ้ำ" + _strTypeTestResult
    '                                    _strRemark = "Duplicate scan serial " + _strTypeTestResult
    '                                    _strScanResultUpdate = "NG"
    '                                    _strTestResultUpdate = _strTestResult

    '                                    _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                                    _bolError = True

    '                                End If

    '                            ElseIf _strTestResult = "NG" Then
    '                                _strMessageUpdate = "Test result was fail " + _strTypeTestResult + _strTagNewLine + "ผลทดสอบชิ้นงานแสดงไม่ผ่าน " + _strTypeTestResult
    '                                _strRemark = "Test result was fail" + _strTypeTestResult
    '                                _strScanResultUpdate = "NG"
    '                                _strTestResultUpdate = _strTestResult
    '                                _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                                _bolError = True
    '                            Else
    '                                _strMessageUpdate = "Not found test result " + _strTypeTestResult + _strTagNewLine + "ไม่พบผลทดสอบชิ้นงาน " + _strTypeTestResult
    '                                _strRemark = "Not found test result " + _strTypeTestResult
    '                                _strScanResultUpdate = "NG"
    '                                _strTestResultUpdate = _strTestResult

    '                                _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))

    '                                _bolError = True
    '                            End If

    '                        Else
    '                            If _intCountDup = 0 Then
    '                                _strScanResultUpdate = "OK"
    '                                _strTestResultUpdate = "OK"
    '                                _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                            Else

    '                                _strMessageUpdate = "Duplicate scan serial " + _strTypeTestResult + _strTagNewLine + "แสกนบาร์โค้ดของชิ้นงานซ้ำ" + _strTypeTestResult
    '                                _strRemark = "Duplicate scan serial " + _strTypeTestResult
    '                                _strScanResultUpdate = "NG"
    '                                _strTestResultUpdate = _strTestResult

    '                                _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                                _bolError = True

    '                            End If
    '                        End If
    '                    End If

    '                Else
    '                    _strMessageUpdate = "Serial not matching product" + _strTagNewLine + "หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้"
    '                    _strRemark = "Serial barcode not matching product"
    '                    _strScanResultUpdate = "NG"
    '                    _strTestResultUpdate = _strTestResult
    '                    _strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
    '                    _bolError = True
    '                End If

    '                If _bolError Then
    '                    lblSerialNG.Text = CStr(CInt(lblSerialNG.Text) + 1)
    '                End If

    '                drRow("REJECT") = _strReject1
    '                drRow("TOUCH_UP") = _strTouchUp
    '                drRow("REJECT2") = _strReject2
    '                drRow("SCAN_RESULT") = _strScanResultUpdate
    '                drRow("TEST_RESULT") = _strTestResultUpdate
    '                drRow("REMARK") = _strMessageUpdate

    '                If _strScanResultUpdate = "NG" Then
    '                    _strScanResultAll = "NG"
    '                End If

    '            End If
    '        Next
    '    End If

    '    lblResult.Text = _strScanResultAll
    '    If _strScanResultAll = "NG" Then
    '        lblResult.ForeColor = Drawing.Color.Red
    '    Else
    '        lblResult.ForeColor = Drawing.Color.Green
    '    End If

    '    Dim dtLotPassCount As New DataTable
    '    dtLotPassCount = BIZ_ScanSMTSerial.GetSerialPassByLot(Session("PLANT_CODE"), _strLot, Session("PROJECT_KIND"))
    '    If dtLotPassCount.Rows.Count > 0 Then
    '        lblLotTotal.Text = dtLotPassCount.Rows(0)("LOT_COUNT").ToString

    '    End If
    '    If Not _bolTrayError Then
    '        gvScanResult.DataSource = dtSerial
    '        gvScanResult.DataBind()
    '    Else
    '        gvScanResult.DataSource = Nothing
    '        gvScanResult.DataBind()
    '    End If
    '    getInitialSerial()

    '    Return 0
    'End Function


    Function setSerialDataTray() As Integer

        If txtMasterCode.Text.Trim.ToUpper = FINAL_GATE_MASTER_CODE Then

            Dim dtSerial As DataTable = getInputSerial()
            Dim _strLot As String = lblLot.Text.Trim.ToUpper
            Dim _strPrdName As String = ddlProduct.SelectedValue
            Dim _strTray As String = " "
            Dim _bolTrayError As Boolean = False
            Dim _bolError As Boolean = False
            Dim _strScanResultAll As String = "OK"
            Dim _intRowSerial As Integer = 0


            If Not _bolTrayError Then

                'If hfTestResultFlag.Value = "Y" Then
                BIZ_ScanSMTSerial.GetSerialTestResultManyTable(Session("PLANT_CODE"), _strPrdName, dtSerial, Session("PRODUCT_KIND"), hfWeekCodeType.Value)
                'End If

                If hfCheckWeekCode.Value = "Y" Then
                    hfWeekCode.Value = BIZ_ScanSMTSerial.GetWeekCodebyLot(_strLot, hfDateInProc.Value, hfWeekCodeType.Value, hfSerialInfo.Value)
                End If

                For Each drRow As DataRow In dtSerial.Rows

                    If drRow("SERIAL").ToString.Trim <> "" Then
                        Dim _intCount As Integer = 0
                        Dim _intCountOK As Integer = 0
                        Dim _intCountNG As Integer = 0
                        Dim _intCountDup As Integer = 0
                        Dim _strRemark As String = ""
                        Dim _strError As String = ""
                        Dim _strSerial As String = drRow("SERIAL").ToString.Trim.ToUpper
                        Dim _dtSerialAll As New DataTable
                        Dim _bolScanDouble As Boolean = False
                        Dim _bolScanDuplicate As Boolean = False
                        Dim _strPrdNameOrg As String = ""
                        Dim _strLotOrg As String = ""
                        Dim _strTrayOrg As String = ""
                        Dim _strTestResultOrg As String = ""
                        Dim _strOK As String = "OK"
                        Dim _strNG As String = "NG"
                        Dim _strScanResultUpdate As String = ""
                        Dim _strMessageUpdate As String = ""
                        Dim _strTestResultUpdate As String = ""
                        Dim _strTypeTestResult As String = ""
                        Dim _strRejectUpdate As String = ""
                        Dim _strReject1 As String = ""
                        Dim _strReject2 As String = ""
                        Dim _strTouchUp As String = ""
                        Dim _strRejectGroup As String = ""

                        _bolError = False

                        Dim _strTestResult As String = "NO"
                        If hfTestResultFlag.Value = "Y" Then

                            _strTestResult = drRow("TEST_RESULT")
                            _strTypeTestResult = drRow("TYPE_TEST_RESULT")
                            _strReject1 = drRow("REJECT")
                            _strRejectUpdate = drRow("REJECT_CODE")
                            _strReject2 = drRow("REJECT2")
                            _strTouchUp = drRow("TOUCH_UP")
                            _strRejectGroup = drRow("REMARK")
                        End If

                        ''''''''''Skip Duplicate Checking 28-Jun-2019'''''''''''

                        'If DUPLICATE_CHECK_FLG = "1" Then  

                        '    If drRow("ROW_COUNT") = 0 Then

                        '        _intCountDup = BIZ_ScanSMTSerial.GetSerialDuplicate(Session("PLANT_CODE"), Mid(_strSerial, CInt(hfDuplicateStart.Value), ((CInt(hfDuplicateEnd.Value) - CInt(hfDuplicateStart.Value)) + 1)), Session("PRODUCT_KIND"))
                        '        drRow("ROW_COUNT") = _intCountDup
                        '    Else
                        '        _intCountDup = drRow("ROW_COUNT")
                        '    End If
                        'End If
                        '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
                        '''''' Check format serial no '''''''
                        If _strScanResultUpdate <> "NG" Then
                            If _strSerial.Length = CInt(hfSerialLength.Value) Then
                                Dim _strFixDigit As String = ""

                                If Not BIZ_ScanSMTSerial.GetCheckSumSerial(_strSerial, hfWeekCodeType.Value, CInt(hfSerialEndDigit.Value)) Then
                                    _strMessageUpdate = "Serial invalid check sum" + _strTagNewLine + "หมายเลขบาร์โค้ดมีค่าตรวจสอบไม่ถูกค้อง"
                                    _strRemark = "Serial invalid check sum"
                                    _strScanResultUpdate = "NG"
                                    _strTestResultUpdate = _strTestResult
                                    drRow("REMARK_UPDATE") = _strRemark
                                    drRow("ROW_UPDATE") = "Y"
                                    '''''''''''''''''''''''''''
                                    _intCountNG = 1
                                    _bolError = True
                                End If

                                If hfSerialFixFlag.Value = "Y" And _strScanResultUpdate <> "NG" Then
                                    _strFixDigit = Mid(_strSerial, CInt(hfSerialStartDigit.Value), (CInt(hfSerialEndDigit.Value) - CInt(hfSerialStartDigit.Value)) + 1)

                                    If _strFixDigit <> hfSerialDigit.Value Then
                                        _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                                        _strRemark = "Serial barcode mix product"
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult

                                        '''' Sucha Modify 31-Aug-2016
                                        ''''_strError = BIZ_ScanSMTSerial.SetSerialLotTray(Session("PLANT_CODE"), _strLot, _strPrdName, _strSerial, _strRejectUpdate, _strTestResult, _strScanResultUpdate, _strRemark, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))

                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    End If

                                    If hfConfigCheck.Value = "Y" And _strScanResultUpdate <> "NG" Then
                                        Dim _strConfigDigit As String = ""
                                        _strConfigDigit = Mid(_strSerial, CInt(hfConfigStart.Value), (CInt(hfConfigEnd.Value) - CInt(hfConfigStart.Value)) + 1)
                                        If _strConfigDigit <> hfConfigCode.Value Then
                                            _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                                            _strRemark = "Serial barcode mix product"
                                            _strScanResultUpdate = "NG"
                                            _strTestResultUpdate = _strTestResult
                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "Y"
                                            '''''''''''''''''''''''''''
                                            _intCountNG = 1
                                            _bolError = True
                                        End If
                                    End If

                                End If

                                If hfSerialStartCode.Value.Trim <> "" And _strScanResultUpdate <> "NG" Then
                                    If Mid(_strSerial, 1, Len(hfSerialStartCode.Value)) <> hfSerialStartCode.Value Then
                                        _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                                        _strRemark = "Serial barcode mix product"
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    End If
                                End If

                                If hfCheckStartSeq.Value = "Y" And _strScanResultUpdate <> "NG" Then
                                    Dim _strStartSeq As String = ""
                                    _strStartSeq = Mid(_strSerial, CInt(hfCheckStartSeqStart.Value), (CInt(hfCheckStartSeqEnd.Value) - CInt(hfCheckStartSeqStart.Value)) + 1)
                                    If _strStartSeq <> hfCheckStartSeqCode.Value Then
                                        _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                                        _strRemark = "Serial barcode mix product"
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    End If

                                End If

                                If hfCheckWeekCode.Value = "Y" And _strScanResultUpdate <> "NG" Then
                                    Dim _strWeekCode As String = ""
                                    _strWeekCode = Mid(_strSerial, CInt(hfCheckWeekCodeStart.Value), (CInt(hfCheckWeekCodeEnd.Value) - CInt(hfCheckWeekCodeStart.Value)) + 1)
                                    If _strWeekCode <> hfWeekCode.Value Then
                                        _strMessageUpdate = "Serial barcode mix week code" + _strTagNewLine + "หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน"
                                        _strRemark = "Serial barcode mix week code"
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    End If
                                End If

                                If Not _bolError Then
                                    For _intRow As Integer = (_intRowSerial + 1) To dtSerial.Rows.Count - 1
                                        If _strSerial.ToUpper = dtSerial.Rows(_intRow)("SERIAL").ToString.Trim.ToUpper Then
                                            _strMessageUpdate = "Serial duplicate in tray" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน"
                                            _strRemark = "Serial duplicate in tray  "
                                            _strScanResultUpdate = "NG"
                                            _strTestResultUpdate = _strTestResult
                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "N"
                                            '''''''''''''''''''''''''''
                                            _intCountNG = 1
                                            _bolError = True
                                        End If
                                    Next
                                End If

                                If Not _bolError And hfCheckPrdSht.Value = "Y" Then
                                    Dim strSheetLot As String = ""
                                    Dim _strShtNo As String = BIZ_ScanSMTSerial.GetSheetNoBySerialNo(Session("PLANT_CODE"), _strSerial, Session("PRODUCT_KIND"), strSheetLot)
                                    If _strShtNo.Trim <> "" And hfCheckPrdAbbr.Value <> Mid(_strShtNo, CInt(hfCheckPrdShtStart.Value), (CInt(hfCheckPrdShtEnd.Value) - CInt(hfCheckPrdShtStart.Value)) + 1) Then
                                        _strMessageUpdate = "Change serial barcode mix product" + _strTagNewLine + "เปลี่ยนหมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                                        _strRemark = "Change serial barcode mix product  "
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    ElseIf _strShtNo.Trim = "" Then
                                        _strMessageUpdate = "No data connect sheet" + _strTagNewLine + "ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส"
                                        _strRemark = "No data connect sheet  "
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True

                                    ElseIf InStr(hfLotAll.Value, strSheetLot, CompareMethod.Text) <= 0 Then
                                        _strMessageUpdate = "Lot not same connect sheet" + _strTagNewLine + "ล๊อตไม่ตรงตามที่แสกนประกบกับหมายเลขชีส"
                                        _strRemark = "Lot not same connect sheet  "
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True

                                    End If
                                End If

                                If Not _bolError And hfPlasmaCheck.Value = "Y" And _strRejectGroup <> "MASTER" Then
                                    Dim _dblPlasmaTime As Double = BIZ_ScanSMTSerial.GetPlasmaTimeBySerialNo(Session("PLANT_CODE"), _strSerial, _strPrdName, txtMasterCode.Text.ToUpper.Trim, Session("PRODUCT_KIND"))
                                    If _dblPlasmaTime = 0 Then
                                        _strMessageUpdate = "Skip Plasma" + _strTagNewLine + "งานไม่ผ่านพลาสม่า"
                                        _strRemark = "Skip plasma"
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    ElseIf _dblPlasmaTime < 0 Then
                                        _strMessageUpdate = "Plasma time do not record" + _strTagNewLine + "ไม่พบข้อมูลการแสกนก่อนเข้าพลาสม่า"
                                        _strRemark = "Plasma time do not record"
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    ElseIf CDbl(hfPlasmaTime.Value) < _dblPlasmaTime And hfPlasmaHideTime.Value = "N" Then
                                        _strMessageUpdate = "Plasma time over " + hfPlasmaTime.Value + " hr." + _strTagNewLine + "เวลาพลาสม่าเกิน " + hfPlasmaTime.Value + " ชม."
                                        _strRemark = "Plasma time over " + hfPlasmaTime.Value + " hr."
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    End If
                                End If

                                If Not _bolError And hfCheckSPIAOI.Value = "Y" Then
                                    Dim _Result As String = ""
                                    Dim _FrontSheetBarcode As String
                                    Dim _RearSheetBarcode As String
                                    Dim _strMessage As String = ""
                                    Dim _intShtSeq As Integer

                                    Dim _dtShtData As DataTable = BIZ_ScanSMTSerial.GetSheetDataBySerialNo(Session("PLANT_CODE"), _strSerial, Session("PRODUCT_KIND"))
                                    If _dtShtData.Rows.Count > 0 Then

                                        _FrontSheetBarcode = _dtShtData.Rows(0)("SHEET_NO_FRONT")
                                        _RearSheetBarcode = _dtShtData.Rows(0)("SHEET_NO_BACK")
                                        _intShtSeq = _dtShtData.Rows(0)("PCS_NO")


                                        _Result = BIZ_ScanSMTSerial.Get_SPI_AOI_RESULT(Session("PLANT_CODE"), _intShtSeq, Session("PRODUCT_KIND"), _FrontSheetBarcode, _RearSheetBarcode, _strPrdName, _strMessage)
                                        If _Result = "NG" Then
                                            _strScanResultUpdate = _Result
                                            _strMessageUpdate = _strMessage
                                            _strRemark = _strMessage
                                            _strScanResultUpdate = "NG"
                                            _strTestResultUpdate = _Result
                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "Y"
                                            '''''''''''''''''''''''''''
                                            _intCountNG = 1
                                            _bolError = True
                                        End If
                                    Else
                                        _strMessageUpdate = "No data connect sheet" + _strTagNewLine + "ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส"
                                        _strRemark = "No data connect sheet  "
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    End If

                                End If

                                If Not _bolError Then
                                    If hfTestResultFlag.Value = "Y" Then
                                        If _strTouchUp = "NG" And _strRejectGroup <> "MASTER" Then
                                            If _strTestResult = "OK" Then
                                                _strMessageUpdate = "Touch up result was fail " + _strTagNewLine + "ผล Touch up ชิ้นงานแสดงไม่ผ่าน"
                                            Else
                                                _strMessageUpdate = "Touch up result was fail " + _strTypeTestResult + _strTagNewLine + "ผล Touch up ชิ้นงานแสดงไม่ผ่าน " + _strTypeTestResult
                                            End If
                                            _strRemark = "Touch up result was fail" + _strTypeTestResult
                                            _strScanResultUpdate = "NG"
                                            _strTestResultUpdate = _strTestResult

                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "Y"
                                            '''''''''''''''''''''''''''

                                            _bolError = True
                                        ElseIf _strTouchUp = "NO" And _strRejectGroup <> "MASTER" Then
                                            If _strTestResult = "OK" Then
                                                _strMessageUpdate = "Not found touch up result " + _strTagNewLine + "ไม่พบผล Touch up ชิ้นงาน"
                                            Else
                                                _strMessageUpdate = "Not found touch up result " + _strTypeTestResult + _strTagNewLine + "ไม่พบผล Touch up ชิ้นงาน " + _strTypeTestResult
                                            End If
                                            _strRemark = "Not found touch up result"
                                            _strScanResultUpdate = "NG"
                                            _strTestResultUpdate = _strTestResult

                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "Y"
                                            '''''''''''''''''''''''''''
                                            _bolError = True

                                        ElseIf _strTestResult = "OK" Then

                                            If _intCountDup = 0 Then
                                                _strScanResultUpdate = "OK"
                                                _strTestResultUpdate = _strTestResult

                                                drRow("REMARK_UPDATE") = _strRemark
                                                drRow("ROW_UPDATE") = "Y"
                                                '''''''''''''''''''''''''''
                                            Else

                                                _strMessageUpdate = "Duplicate scan serial " + _strTypeTestResult + _strTagNewLine + "แสกนบาร์โค้ดของชิ้นงานซ้ำ" + _strTypeTestResult
                                                _strRemark = "Duplicate scan serial " + _strTypeTestResult
                                                _strScanResultUpdate = "NG"
                                                _strTestResultUpdate = _strTestResult

                                                drRow("REMARK_UPDATE") = _strRemark
                                                drRow("ROW_UPDATE") = "Y"
                                                '''''''''''''''''''''''''''

                                                _bolError = True

                                            End If

                                        ElseIf _strTestResult = "NG" Then
                                            _strMessageUpdate = "Test result was fail " + _strTypeTestResult + _strTagNewLine + "ผลทดสอบชิ้นงานแสดงไม่ผ่าน " + _strTypeTestResult
                                            _strRemark = "Test result was fail" + _strTypeTestResult
                                            _strScanResultUpdate = "NG"
                                            _strTestResultUpdate = _strTestResult

                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "Y"
                                            '''''''''''''''''''''''''''

                                            _bolError = True
                                        Else
                                            _strMessageUpdate = "Not found test result " + _strTypeTestResult + _strTagNewLine + "ไม่พบผลทดสอบชิ้นงาน " + _strTypeTestResult
                                            _strRemark = "Not found test result " + _strTypeTestResult
                                            _strScanResultUpdate = "NG"
                                            _strTestResultUpdate = _strTestResult

                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "Y"
                                            '''''''''''''''''''''''''''
                                            _bolError = True
                                        End If

                                    Else
                                        If _intCountDup = 0 Then
                                            _strScanResultUpdate = "OK"
                                            _strTestResultUpdate = "OK"

                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "Y"
                                            '''''''''''''''''''''''''''
                                        Else

                                            _strMessageUpdate = "Duplicate scan serial " + _strTypeTestResult + _strTagNewLine + "แสกนบาร์โค้ดของชิ้นงานซ้ำ" + _strTypeTestResult
                                            _strRemark = "Duplicate scan serial " + _strTypeTestResult
                                            _strScanResultUpdate = "NG"
                                            _strTestResultUpdate = _strTestResult

                                            drRow("REMARK_UPDATE") = _strRemark
                                            drRow("ROW_UPDATE") = "Y"
                                            '''''''''''''''''''''''''''

                                            _bolError = True

                                        End If
                                    End If
                                End If


                                If hfChipIDCheck.Value = "Y" And _bolError = False Then
                                    Dim _intCheckPass As Integer = BIZ_ScanSMTSerial.GetCheckChipDuplicate(Session("PLANT_CODE"), Session("PRODUCT_KIND"), _strPrdName, _strSerial)
                                    If _intCheckPass = 0 Then
                                        _strMessageUpdate = "USER SKIP TEST ELT2"
                                        _strRemark = "USER SKIP TEST ELT2"
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True

                                    End If
                                End If


                                If (hfCheckEFPCAOM.Value = "Y" Or hfCheckEFPCAOI.Value = "Y" Or hfCheckEFPCOST.Value = "Y" Or hfCheckEFPCAVI.Value = "Y") Then
                                    Dim _strEFPCResult As String = ""
                                    Dim _strEFPCRemark As String = BIZ_ScanSMTSerial.GetEFPCSheetInspectionResult(Session("PLANT_CODE"), Session("PRODUCT_KIND"), _strPrdName, drRow("FRONT_SHEET_NO"), drRow("BACK_SHEET_NO"), CInt(drRow("SHEET_PCS_NO").ToString), hfCheckEFPCAOM.Value, hfCheckEFPCAOI.Value, hfCheckEFPCOST.Value, hfCheckEFPCAVI.Value, _strEFPCResult)

                                    If _strEFPCResult = "NG" Then
                                        _strMessageUpdate = _strEFPCRemark
                                        _strRemark = _strEFPCRemark
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True
                                    End If

                                End If

                                If hfCheckFinInspect.Value = "Y" And _bolError = False Then

                                    Dim _strInspResult As String = BIZ_ScanSMTSerial.GetSerialFinInspectResult(Session("PLANT_CODE"), _strSerial, hfCheckFinInspectProc.Value, Session("PRODUCT_KIND"))
                                    If _strInspResult <> "OK" Then
                                        _strMessageUpdate = _strMessageUpdate + _strInspResult
                                        _strRemark = _strInspResult
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True

                                    End If
                                End If

                                If FINAL_GATE_SPECIAL_FLG = "1" And InStr(FINAL_GATE_SPECIAL_PRD, _strPrdName) > 0 And _bolError = False Then
                                    Dim _intCheckPass As Integer = BIZ_ScanSMTSerial.GetCheckSpecialBySerial(Session("PLANT_CODE"), Session("PRODUCT_KIND"), _strSerial, FINAL_GATE_SPECIAL_SERIAL_VAR, FINAL_GATE_SPECIAL_OK, FINAL_GATE_SPECIAL_QUERY)
                                    If _intCheckPass = 0 Then
                                        _strMessageUpdate = FINAL_GATE_SPECIAL_MESSAGE
                                        _strRemark = FINAL_GATE_SPECIAL_MESSAGE
                                        _strScanResultUpdate = "NG"
                                        _strTestResultUpdate = _strTestResult
                                        drRow("REMARK_UPDATE") = _strRemark
                                        drRow("ROW_UPDATE") = "Y"
                                        '''''''''''''''''''''''''''
                                        _intCountNG = 1
                                        _bolError = True

                                    End If
                                End If


                            Else
                                _strMessageUpdate = "Serial not matching product" + _strTagNewLine + "หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้"
                                _strRemark = "Serial barcode not matching product"
                                _strScanResultUpdate = "NG"
                                _strTestResultUpdate = _strTestResult

                                drRow("REMARK_UPDATE") = _strRemark
                                drRow("ROW_UPDATE") = "Y"
                                '''''''''''''''''''''''''''
                                _bolError = True
                            End If

                            If _bolError Then
                                lblSerialNG.Text = CStr(CInt(lblSerialNG.Text) + 1)
                            End If
                        End If


                        '''''''''''''''''''''''''''
                        If _strRejectGroup = "MASTER" Then
                            _strTestResultUpdate = _strTestResult
                            _strTouchUp = ""
                            _strReject2 = ""
                            '_bolError = True
                            If _strTestResult = "OK" And _strMessageUpdate.Trim = "" Then
                                _strMessageUpdate = ""
                            End If

                        End If
                        ''''''''''''''''''''''''''''

                        drRow("REJECT") = _strReject1
                        drRow("TOUCH_UP") = _strTouchUp
                        drRow("REJECT2") = _strReject2
                        drRow("SCAN_RESULT") = _strScanResultUpdate
                        drRow("TEST_RESULT") = _strTestResultUpdate
                        drRow("REMARK") = _strMessageUpdate

                        If _strScanResultUpdate = "NG" Then
                            _strScanResultAll = "NG"
                        End If

                    End If

                    _intRowSerial = _intRowSerial + 1
                Next

                lblResult.Text = _strScanResultAll

                If _strScanResultAll = "NG" Then
                    lblResult.ForeColor = Drawing.Color.Red
                Else
                    lblResult.ForeColor = Drawing.Color.Green
                End If

                Dim _strErrorUpdate As String = ""
                _strErrorUpdate = BIZ_ScanSMTSerial.SetSerialLotTrayTable(Session("PLANT_CODE"), _strLot, _strPrdName, dtSerial, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
                If _strErrorUpdate <> "" Then
                    lblResult.Text = "Error :" + _strErrorUpdate
                    lblResult.ForeColor = Drawing.Color.Red

                End If

            End If


            Dim dtLotPassCount As New DataTable
            dtLotPassCount = BIZ_ScanSMTSerial.GetSerialPassByLot(Session("PLANT_CODE"), _strLot, Session("PRODUCT_KIND"))
            If dtLotPassCount.Rows.Count > 0 Then
                lblLotTotal.Text = dtLotPassCount.Rows(0)("LOT_COUNT").ToString

            End If
            If Not _bolTrayError Then
                gvScanResult.DataSource = dtSerial
                gvScanResult.DataBind()

                ExportGridToCSV()
            Else
                gvScanResult.DataSource = Nothing
                gvScanResult.DataBind()
            End If
            getInitialSerial()
            fnSetFocus("gvSerial_txtSerial_0")
        Else

            pnlLog.Visible = True
            lblLog.Text = "Scan master code incorrect" + _strTagNewLine + " สแกน master code ไม่ถูกต้อง"
            txtMasterCode.Text = ""
            fnSetFocus("txtMasterCode")

        End If
        Return 0
    End Function

    Function getInputSerial() As DataTable
        Dim dtData As New DataTable
        Dim intRow As Integer = 0
        dtData.Columns.Add(New DataColumn("SEQ", Type.GetType("System.Double")))
        dtData.Columns.Add(New DataColumn("SERIAL", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("REJECT", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("TOUCH_UP", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("REJECT2", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("REJECT_CODE", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("TEST_RESULT", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("TYPE_TEST_RESULT", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("SCAN_RESULT", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("REMARK", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("REMARK_UPDATE", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("ROW_COUNT", Type.GetType("System.Double")))
        dtData.Columns.Add(New DataColumn("ROW_UPDATE", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("UPDATE_FLG", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("PACKING_NO", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("MASTER_NO", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("FRONT_SHEET_NO", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("BACK_SHEET_NO", Type.GetType("System.String")))
        dtData.Columns.Add(New DataColumn("SHEET_PCS_NO", Type.GetType("System.Double")))
        dtData.Columns.Add(New DataColumn("ROLL_LEAF_NO", Type.GetType("System.String")))
        For intSeq As Integer = 0 To gvSerial.Rows.Count - 1
            Dim drRow As DataRow
            intRow = intRow + 1
            drRow = dtData.NewRow
            drRow("SEQ") = intRow
            drRow("SERIAL") = CType(gvSerial.Rows(intSeq).FindControl("txtSerial"), TextBox).Text.Trim.ToUpper
            drRow("REJECT") = ""
            drRow("TOUCH_UP") = ""
            drRow("REJECT2") = ""
            drRow("REJECT_CODE") = ""
            drRow("SCAN_RESULT") = ""
            drRow("TEST_RESULT") = ""
            drRow("TYPE_TEST_RESULT") = ""
            drRow("REMARK") = ""
            drRow("REMARK_UPDATE") = ""
            drRow("ROW_COUNT") = 0
            drRow("ROW_UPDATE") = "N"
            drRow("UPDATE_FLG") = "N"
            drRow("PACKING_NO") = ""
            drRow("MASTER_NO") = txtMasterCode.Text.Trim.ToUpper
            drRow("FRONT_SHEET_NO") = ""
            drRow("BACK_SHEET_NO") = ""
            drRow("SHEET_PCS_NO") = 0
            drRow("ROLL_LEAF_NO") = ""

            If drRow("SERIAL").ToString.Trim <> "" Then
                For intNo As Integer = 0 To intRow - 2
                    If drRow("SERIAL").ToString.Trim = CType(gvSerial.Rows(intNo).FindControl("txtSerial"), TextBox).Text.Trim.ToUpper Then
                        drRow("ROW_COUNT") = 9
                        Exit For
                    End If
                Next
            End If
            dtData.Rows.Add(drRow)
        Next
        Return dtData
    End Function

    Function getProductSerialMaster() As Integer
        Dim dtProductSerial As New DataTable
        hfSerialLength.Value = "0"
        hfSerialFixFlag.Value = "N"
        hfSerialDigit.Value = ""
        hfSerialStartDigit.Value = "0"
        hfSerialEndDigit.Value = "0"
        hfTrayFlag.Value = ""
        hfTrayLength.Value = "0"
        hfTestResultFlag.Value = ""
        hfConfigCheck.Value = "N"
        hfConfigCode.Value = ""
        hfConfigStart.Value = "0"
        hfConfigEnd.Value = "0"
        hfConfigRuning.Value = "N"
        hfDuplicateStart.Value = "0"
        hfDuplicateEnd.Value = "0"
        hfChipIDCheck.Value = "N"
        hfCheckPrdSht.Value = "N"
        hfCheckPrdShtStart.Value = "0"
        hfCheckPrdShtEnd.Value = "0"
        hfCheckPrdAbbr.Value = ""
        hfPlasmaCheck.Value = "N"
        hfPlasmaTime.Value = "0"

        hfCheckStartSeq.Value = "N"
        hfCheckStartSeqCode.Value = ""
        hfCheckStartSeqStart.Value = "0"
        hfCheckStartSeqEnd.Value = "0"
        hfCheckSPIAOI.Value = "N"
        hfCheckDateInProc.Value = "N"
        hfDateInProc.Value = ""
        hfCheckWeekCode.Value = "N"
        hfCheckWeekCodeStart.Value = ""
        hfCheckWeekCodeEnd.Value = ""
        hfWeekCode.Value = ""
        hfWeekCodeType.Value = ""
        hfCheckPreAOIF.Value = "N"
        hfCheckPreAOIB.Value = "N"
        hfCheckAOIF.Value = "N"
        hfCheckAOIB.Value = "N"
        hfCheckSPIF.Value = "N"
        hfCheckSPIB.Value = "N"
        hfSerialStartCode.Value = ""
        hfPlasmaSkipELT.Value = "N"
        hfPlasmaHideTime.Value = "N"

        hfCheckEFPCAOM.Value = "N"
        hfCheckEFPCAOI.Value = "N"
        hfCheckEFPCOST.Value = "N"
        hfCheckEFPCAVI.Value = "N"
        hfCheckXrayF.Value = "N"
        hfCheckXrayB.Value = "N"
        hfCheckXrayOneTime.Value = "N"
        hfCheckFinInspect.Value = "N"
        hfCheckFinInspectProc.Value = ""


        dtProductSerial = BIZ_ScanSMTSerial.GetSerialProductByProduct(Session("PLANT_CODE"), ddlProduct.SelectedValue, Session("PRODUCT_KIND"))
        If dtProductSerial.Rows.Count > 0 Then
            hfSerialLength.Value = dtProductSerial.Rows(0)("SLM_SERIAL_LENGTH").ToString
            hfSerialFixFlag.Value = dtProductSerial.Rows(0)("SLM_FIX_FLAG").ToString
            hfSerialDigit.Value = dtProductSerial.Rows(0)("SLM_FIX_DIGIT").ToString
            hfSerialStartDigit.Value = dtProductSerial.Rows(0)("SLM_FIX_START_DIGIT").ToString
            hfSerialEndDigit.Value = dtProductSerial.Rows(0)("SLM_FIX_END_DIGIT").ToString
            hfTrayFlag.Value = dtProductSerial.Rows(0)("SLM_TRAY_FLAG").ToString
            hfTrayLength.Value = dtProductSerial.Rows(0)("SLM_TRAY_LENGTH").ToString
            hfTestResultFlag.Value = dtProductSerial.Rows(0)("SLM_TEST_RESULT_FLAG").ToString
            ''''''''''''''''''''
            'hfSerialCount.Value = dtProductSerial.Rows(0)("SLM_SERIAL_COUNT").ToString
            hfSerialCount.Value = dtProductSerial.Rows(0)("PRM_PCS_TRAY").ToString
            '''''''''''''''''''
            hfAutoScan.Value = dtProductSerial.Rows(0)("SLM_AUTO_SCAN").ToString
            hfConfigCheck.Value = dtProductSerial.Rows(0)("PRM_BARCODE_REQ_CONFIG").ToString().Trim
            hfConfigCode.Value = dtProductSerial.Rows(0)("PRM_CONFIG_CODE").ToString().Trim
            hfConfigStart.Value = dtProductSerial.Rows(0)("PRM_START_CONFIG").ToString().Trim
            hfConfigEnd.Value = dtProductSerial.Rows(0)("PRM_END_CONFIG").ToString().Trim
            hfConfigRuning.Value = dtProductSerial.Rows(0)("PRM_RUNNING_REQ_CONFIG").ToString().Trim
            hfDuplicateStart.Value = dtProductSerial.Rows(0)("PRM_DUPLICATE_START").ToString().Trim
            hfDuplicateEnd.Value = dtProductSerial.Rows(0)("PRM_DUPLICATE_END").ToString().Trim
            hfChipIDCheck.Value = dtProductSerial.Rows(0)("PRM_CHECK_CHIP_ID_FLG").ToString().Trim
            hfCheckPrdSht.Value = dtProductSerial.Rows(0)("PRM_REQ_CHECK_PRD_SHT").ToString().Trim
            hfCheckPrdShtStart.Value = dtProductSerial.Rows(0)("PRM_CHECK_PRD_SHT_START").ToString().Trim
            hfCheckPrdShtEnd.Value = dtProductSerial.Rows(0)("PRM_CHECK_PRD_SHT_END").ToString().Trim
            hfCheckPrdAbbr.Value = dtProductSerial.Rows(0)("PRM_ABBR").ToString().Trim
            hfPlasmaCheck.Value = dtProductSerial.Rows(0)("PRM_PLASMA_TIME_FLG").ToString().Trim
            hfPlasmaTime.Value = dtProductSerial.Rows(0)("PRM_PLASMA_TIME").ToString().Trim
            hfCheckStartSeq.Value = dtProductSerial.Rows(0)("PRM_REQ_START_SEQ_FLG").ToString().Trim
            hfCheckStartSeqCode.Value = dtProductSerial.Rows(0)("PRM_START_SEQ_CODE").ToString().Trim
            hfCheckStartSeqStart.Value = dtProductSerial.Rows(0)("PRM_START_SEQ_START").ToString().Trim
            hfCheckStartSeqEnd.Value = dtProductSerial.Rows(0)("PRM_START_SEQ_END").ToString().Trim
            hfCheckSPIAOI.Value = dtProductSerial.Rows(0)("PRM_FINAL_AOI_SPI_FLG").ToString().Trim
            hfCheckDateInProc.Value = dtProductSerial.Rows(0)("PRM_DATE_INPROC_FLG").ToString().Trim
            hfDateInProc.Value = dtProductSerial.Rows(0)("PRM_DATE_INPROC").ToString().Trim
            hfWeekCodeType.Value = dtProductSerial.Rows(0)("PRM_DATE_TYPE").ToString().Trim
            hfCheckWeekCode.Value = dtProductSerial.Rows(0)("PRM_CHECK_WEEKCODE_FLG").ToString().Trim
            hfCheckWeekCodeStart.Value = dtProductSerial.Rows(0)("PRM_CHECK_WEEKCODE_START").ToString().Trim
            hfCheckWeekCodeEnd.Value = dtProductSerial.Rows(0)("PRM_CHECK_WEEKCODE_END").ToString().Trim
            hfCheckPreAOIF.Value = dtProductSerial.Rows(0)("PRM_SHT_PRE_AOI_F").ToString().Trim
            hfCheckPreAOIB.Value = dtProductSerial.Rows(0)("PRM_SHT_PRE_AOI_B").ToString().Trim
            hfCheckAOIF.Value = dtProductSerial.Rows(0)("PRM_SHT_AOI_F").ToString().Trim
            hfCheckAOIB.Value = dtProductSerial.Rows(0)("PRM_SHT_AOI_B").ToString().Trim
            hfCheckAOICoatF.Value = dtProductSerial.Rows(0)("PRM_SHT_AOI_COAT_F").ToString().Trim
            hfCheckAOICoatB.Value = dtProductSerial.Rows(0)("PRM_SHT_AOI_COAT_B").ToString().Trim
            hfCheckSPIF.Value = dtProductSerial.Rows(0)("PRM_SHT_SPI_F").ToString().Trim
            hfCheckSPIB.Value = dtProductSerial.Rows(0)("PRM_SHT_SPI_B").ToString().Trim
            hfSerialStartCode.Value = dtProductSerial.Rows(0)("PRM_SERIAL_START_CODE").ToString().Trim
            hfPlasmaSkipELT.Value = dtProductSerial.Rows(0)("PRM_PLASMA_TIME_SKIP_ELT").ToString().Trim
            hfPlasmaHideTime.Value = dtProductSerial.Rows(0)("PRM_PLASMA_TIME_HIDE_TIME").ToString().Trim

            hfCheckEFPCAOM.Value = dtProductSerial.Rows(0)("PRM_CHECK_EFPC_AOM_FLG").ToString().Trim
            hfCheckEFPCAOI.Value = dtProductSerial.Rows(0)("PRM_CHECK_EFPC_AOI_FLG").ToString().Trim
            hfCheckEFPCOST.Value = dtProductSerial.Rows(0)("PRM_CHECK_EFPC_OST_FLG").ToString().Trim
            hfCheckEFPCAVI.Value = dtProductSerial.Rows(0)("PRM_CHECK_EFPC_AVI_FLG").ToString().Trim
            hfSerialInfo.Value = dtProductSerial.Rows(0)("PRM_ADDITIONAL_INFO").ToString().Trim
            hfCheckXrayF.Value = dtProductSerial.Rows(0)("PRM_SHT_XRAY_F").ToString().Trim
            hfCheckXrayB.Value = dtProductSerial.Rows(0)("PRM_SHT_XRAY_B").ToString().Trim
            hfCheckXrayOneTime.Value = dtProductSerial.Rows(0)("PRM_SHT_XRAY_1_TIME_FLG").ToString().Trim
            hfCheckFinInspect.Value = dtProductSerial.Rows(0)("PRM_FIN_GATE_INSPECT_FLG").ToString().Trim
            hfCheckFinInspectProc.Value = dtProductSerial.Rows(0)("PRM_FIN_GATE_INSPECT_PROC").ToString().Trim

        End If
        Return 0
    End Function


    Private Sub DownloadCSV()
        Response.Clear()
        Response.Buffer = True
        Response.AddHeader("content-disposition", "attachment;filename=ELTResult.csv")
        Response.Charset = ""
        Response.ContentType = "application/text"
        Response.Output.Write(ViewState("DownloadCSV"))
        Response.Flush()
        Response.End()
    End Sub


    Private Sub ExportGridToCSV()
        Dim columnbind As New StringBuilder
        Dim intHead As Integer = 0
        Do While (intHead < gvScanResult.Columns.Count)
            columnbind.Append((Server.HtmlDecode(gvScanResult.Columns(intHead).HeaderText) + Microsoft.VisualBasic.ChrW(44)))
            intHead = (intHead + 1)
        Loop
        columnbind.Append("" & vbCrLf)
        Dim intSeq As Integer = 0
        Do While (intSeq < gvScanResult.Rows.Count)
            Dim intDetail As Integer = 0
            Do While (intDetail < gvScanResult.Columns.Count)
                columnbind.Append((Server.HtmlDecode(gvScanResult.Rows(intSeq).Cells(intDetail).Text) + Microsoft.VisualBasic.ChrW(44)))
                intDetail = (intDetail + 1)
            Loop
            columnbind.Append("" & vbCrLf)
            intSeq = (intSeq + 1)
        Loop
        ViewState("DownloadCSV") = columnbind.ToString

        Page.ClientScript.RegisterStartupScript(Me.GetType(), "ExportCSVFile", "ShowAlert(); document.getElementById('gvSerial_txtSerial_0').focus();", True)

    End Sub
#End Region

End Class