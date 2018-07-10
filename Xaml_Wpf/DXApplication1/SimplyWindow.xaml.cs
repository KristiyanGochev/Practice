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
using System.Windows.Shapes;

namespace DXApplication1 {
    /// <summary>
    /// Interaction logic for SimplyWindow.xaml
    /// </summary>
    public partial class SimplyWindow : Window {
        public SimplyWindow() {
            InitializeComponent();
        }

        public string ResponseText {
            get { return ResponseTextBox.Text; }
            set { ResponseTextBox.Text = value; }
        }
        public bool isCanceled = false;

        private void OKButton_Click(object sender, System.Windows.RoutedEventArgs e) {
            isCanceled = false;
            DialogResult = true;
        }

        private void Close_Dialog_MouseDown(object sender, MouseButtonEventArgs e) {
            isCanceled = true;
            Close();
        }

        private void Window_MouseDown(object sender, MouseButtonEventArgs e) {
            if (e.ChangedButton == MouseButton.Left) {
                dialogWindow.DragMove();
            }
        }

        private void Calcel_Button_Click(object sender, RoutedEventArgs e) {
            isCanceled = true;
            Close();
            return;
        }
    }
}
