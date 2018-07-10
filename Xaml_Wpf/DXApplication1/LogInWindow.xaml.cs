using DXApplication1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Xml.Linq;

namespace CleanWPF
{
    /// <summary>
    /// Interaction logic for LogInWindow.xaml
    /// </summary>
    public partial class LogInWindow : Window {
        public LogInWindow() {
            InitializeComponent();
        }

        /// <summary>
        /// Credentials
        /// </summary>
        public const string userUserName = "Kris";

       static readonly List<Tuple<string, string>> UserNameList = new List<Tuple<string, string>> {
                new Tuple<string, string>("Kris", "123"),
                new Tuple<string, string>( "Gosho", "1234"),
                new Tuple<string, string>( "Rachkur", "12345")
            };

        public const string userPassWord = "1234";

        private void Window_MouseDown(object sender, MouseButtonEventArgs e) {
            if (e.ChangedButton == MouseButton.Left) {
                LogWindow.DragMove();
            }
        }

        private void OnLogInClick(object sender, RoutedEventArgs e) {
            if (string.IsNullOrWhiteSpace(userNameBox.Text)) {
                MessageBox.Show("Please enter your User Name");
                return;
            }

            if (string.IsNullOrWhiteSpace(passwordBox.Password)) {
                MessageBox.Show("Please enter your Password");
                return;
            }
            bool checkIt = CheckCredentials(userNameBox.Text, passwordBox.Password);

            if (!checkIt) {
                MessageBox.Show("Your UserName or Password are incorect!");
                return;
            }
            MainWindow newWindow = new MainWindow();
            newWindow.Show();
            Close();
        }

        /// <summary>
        /// User credentials validation
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passWord"></param>
        /// <returns></returns>
        public bool CheckCredentials(string userName, string passWord) {

            // Uncomment the lines below if want to have basic password check
            // Currently the check is forced to return true 


            //    if (string.IsNullOrWhiteSpace(userName)) {
            //        throw new Exception("UserName could not be Null!");
            //    }
            //    if (string.IsNullOrWhiteSpace(passWord)) {
            //        throw new Exception("UserName could not be Null!");
            //    }

            //    List<string> existUser = UserNameList
            //                .Where(x => (x.Item1 == userName) && (x.Item2 == passWord))
            //                    .Select(x => x.Item1).ToList();

            //    if (existUser.Count > 0) {
            //        return true;
            //    }
            //    return false;
            //}
            return true;
        }
        private void Close_App_MouseDown(object sender, MouseButtonEventArgs e) {
                        Application.Current.Shutdown();
        }
    }
}
