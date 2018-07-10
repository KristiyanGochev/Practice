using System;
using System.Collections.Generic;
using System.IO;
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
using DXApplication1.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DXApplication1
{
    /// <summary>
    /// Interaction logic for Users.xaml
    /// </summary>
    public partial class Users : UserControl
    {
        public Users()
        {
            InitializeComponent();
            var test = GetData();
            this.DataContext = test;
        }
        public object GetData() {

            string filepath = "D:/WorkItems/Users.json";
            // string filepath = "D:/(Advance)WPF/12/DXApplication1/DXApplication1/Data";
            string result = string.Empty;
            List<UsersData> UserDataClass = null;
            try {
                using (StreamReader reader = new StreamReader(filepath)) {
                    result = reader.ReadToEnd();                  
                }
                Console.WriteLine(result);
                UserDataClass = JsonConvert.DeserializeObject<List<UsersData>>(result);
            }
            catch (Exception exc) {
                MessageBox.Show(exc.Message);
            }

            return UserDataClass;
        }
    }
}
