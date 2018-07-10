using DXApplication1.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Windows;
using System.Windows.Controls;

namespace DXApplication1 {
    /// <summary>
    /// Interaction logic for MainPage.xaml
    /// </summary>
    public partial class Home : UserControl {
        public Home() {
            InitializeComponent();
        }


        private void SendBtn_Click(object sender, System.Windows.RoutedEventArgs e) {
           
            try {
                string searchWord = MovieName.Text;
                List<MovieData> MovieDataList = null;

                var request = System.Net.WebRequest.Create(
                    "https://api.themoviedb.org/3/search/movie?api_key=ee4147bedd685cdebb23042532c92117&language=en-US&query="
                    + searchWord
                    + "&page=1&include_adult=false") as System.Net.HttpWebRequest;

                request.Method = "GET";
                request.Accept = "application/json";
                request.ContentLength = 0;
                string responseContent;
                using (var response = request.GetResponse() as System.Net.HttpWebResponse) {
                    using (var reader = new System.IO.StreamReader(response.GetResponseStream())) {
                        responseContent = reader.ReadToEnd();
                    }
                }

                int foundS1 = responseContent.IndexOf("\"results\"");

                var makeItReadable = responseContent.Remove(0, foundS1 + 10);
                var removeLastChar= makeItReadable.Remove(makeItReadable.Length - 1);    

                MovieDataList = JsonConvert.DeserializeObject<List<MovieData>>(removeLastChar);
                MovieGrid.DataContext = MovieDataList;

                MovieGrid.Items.Refresh();
            }
            catch (Exception exc) {
                MessageBox.Show(exc.Message);
            }
        }
    }
}
