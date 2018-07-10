using DevExpress.Xpf.RichEdit;
using DevExpress.Xpf.Spreadsheet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace DXApplication1
{
    /// <summary>
    /// Interaction logic for TemplateTwo.xaml
    /// </summary>
    public partial class TemplateTwo : UserControl
    {
        public TemplateTwo()
        {
            InitializeComponent();
        }
        private void ButtonOne_Click(object sender, RoutedEventArgs e) {
            RichEditControl EditCntr = new RichEditControl();
            EditCntr.CommandBarStyle = DevExpress.Xpf.RichEdit.CommandBarStyle.Empty;
            EditCntr.LoadDocument("D:/WorkItems/templateOne.docx");
            EditCntr.VerticalAlignment = VerticalAlignment.Stretch;
            EditCntr.HorizontalAlignment = HorizontalAlignment.Stretch;

            ChildGrid.Children.Add(EditCntr);

        }
        

        private void ButtonTwo_Click(object sender, RoutedEventArgs e) {
            SpreadsheetControl spreadSHIT = new SpreadsheetControl();
            spreadSHIT.CommandBarStyle = DevExpress.Xpf.Spreadsheet.CommandBarStyle.Empty;
            spreadSHIT.VerticalAlignment = VerticalAlignment.Stretch;
            spreadSHIT.HorizontalAlignment = HorizontalAlignment.Stretch;

            ChildGrid.Children.Add(spreadSHIT);
        }
        
        private void ButtonThree_Click(object sender, RoutedEventArgs e) {

        }
    }
}
