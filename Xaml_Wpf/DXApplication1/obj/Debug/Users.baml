   M S B A M L   `   `   `  ����  HamburgerMenu    DXApplication1.Users   5      \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35a ]DevExpress.Xpf.Core.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49aF 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      .��5
      � .+�5   
   &   System.Windows.Controls.DataGrid  $��Stretch=�6   $
��auto��5      $��Stretch=�5          AutoGenerateColumns  .     CanUserReorderColumns .    CanUserAddRows .    CanUserDeleteRows . $
��auto��5         ColumnWidth5  /System.Windows.Controls.DataGridLengthConverter$
 auto 5         GridLinesVisibility$	 All=�5         HorizontalGridLinesBrush
 �����   VerticalGridLinesBrush
 �������5      ��    Columns 5      4  .System.Windows.Controls.DataGridTemplateColumn  5      ,  &System.Windows.Controls.DataGridColumn	   Header$	 Image��6)   
   
IsReadOnly
 .    CellTemplate 5      �� 5      .R�5      �� $	��100��6?   ��6$   �� *	Picture+6?   5       5"      0  *System.Windows.Controls.DataGridTextColumn  5$      $
	 Name��6%   1  +System.Windows.Controls.DataGridBoundColumn   Binding 63   �� *Name+  5%      $		 Age��6%    62   �� *Age+  5&      $	 IsActive��6%    67   �� *
IsActive+  5'      $	 Company��6%    66   �� *	Company+  5(      $	 Phone��6%    64   �� *Phone+  5)      $	 Address��6%    66   �� *	Address+  5*      $	 Gender��6%    65   �� *Gender+  5+      $	 Email��6%    64   �� *Email+  5,      $	 Balance��6%    66   �� *	Balance+5/      50      51      