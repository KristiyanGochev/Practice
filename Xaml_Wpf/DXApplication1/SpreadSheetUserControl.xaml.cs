using DevExpress.Xpf.Core;
using DevExpress.Xpf.Spreadsheet;
using System.Windows;
using System.Windows.Controls;

namespace DXApplication1 {
    /// <summary>
    /// Interaction logic for SettingsPage.xaml
    /// </summary>
    public partial class SpreadSheetUserControl : UserControl {
        public SpreadSheetUserControl() {

            InitializeComponent();
        }
        public long nextPage = 1;

        private void tbCtrl_Loaded(object sender, RoutedEventArgs e) {
            tabControl = (sender as DXTabControl);
        }

        private void addTab_Click(object sender, RoutedEventArgs e) {
            string pageText = "";

            var dialog = new SimplyWindow();

            if (dialog.ShowDialog() == true) {
                pageText = dialog.ResponseText;
            }

            if (dialog.isCanceled) {
                return;
            }

            if (string.IsNullOrWhiteSpace(pageText)) {
                pageText = "Uknown";
            }

            DXTabItem newTabItem = new DXTabItem {
                Header = pageText,
                AllowHide = DevExpress.Utils.DefaultBoolean.True,
                Content = new SpreadSheet()
            };

            tabControl.Items.Add(newTabItem);
        }
    }    
}
