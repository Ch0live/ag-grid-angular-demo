import { Component, Input, ViewEncapsulation } from '@angular/core';

import {
  type ColDef,
  type GetDataPath,
  type ValueFormatterFunc,
  type ValueFormatterParams,
} from '@ag-grid-community/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { getData } from './data';

import { ContactCellRenderer } from './cell-renderers/contact-cell-renderer.component';
import { EmployeeCellRenderer } from './cell-renderers/employee-cell-renderer.component';
import { FlagCellRenderer } from './cell-renderers/flag-cell-renderer-component';
import { StatusCellRenderer } from './cell-renderers/status-cell-renderer.component';
import { TagCellRenderer } from './cell-renderers/tag-cell-renderer.component';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MasterDetailModule,
  RowGroupingModule,
  RichSelectModule,
  SetFilterModule,
  StatusBarModule,
]);

const employmentType = ['Permanent', 'Contract'];
const paymentMethod = ['Cash', 'Check', 'Bank Transfer'];
const paymentStatus = ['Paid', 'Pending'];
const departments = {
  executiveManagement: 'Executive Management',
  legal: 'Legal',
  design: 'Design',
  engineering: 'Engineering',
  product: 'Product',
  customerSupport: 'Customer Support',
};
const departmentFormatter: ValueFormatterFunc = ({ value }) =>
  departments[value as keyof typeof departments] ?? '';

@Component({
  selector: 'hr-example',
  standalone: true,
  imports: [
    AgGridAngular,
    ContactCellRenderer,
    EmployeeCellRenderer,
    FlagCellRenderer,
    StatusCellRenderer,
    TagCellRenderer,
  ],
  templateUrl: './hr-example.component.html',
  styleUrl: './hr-example.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HRExample {
  @Input() gridTheme: string = 'ag-theme-quartz';
  @Input() isDarkMode: boolean = false;

  themeClass = `${this.gridTheme}${this.isDarkMode ? '-dark' : ''}`;

  rowData = getData();
  getDataPath: GetDataPath = (data) => data.orgHierarchy;
  autoGroupColumnDef: ColDef = {
    headerName: 'Employee',
    width: 330,
    pinned: 'left',
    sort: 'asc',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      suppressCount: true,
      innerRenderer: EmployeeCellRenderer,
    },
  };
  groupDefaultExpanded = -1;
  treeData = true;
  columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'employeeId',
      width: 120,
    },
    {
      field: 'department',
      width: 250,
      valueFormatter: departmentFormatter,
      cellRenderer: TagCellRenderer,
    },
    {
      field: 'employmentType',
      editable: true,
      width: 180,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: employmentType,
      },
    },
    {
      field: 'location',
      width: 200,
      cellRenderer: FlagCellRenderer,
      editable: true,
    },
    {
      field: 'joinDate',
      editable: true,
      width: 120,
    },
    {
      headerName: 'Salary',
      field: 'basicMonthlySalary',
      valueFormatter: ({ value }: ValueFormatterParams) =>
        value == null ? '' : `$${Math.round(value).toLocaleString()}`,
    },
    {
      field: 'paymentMethod',
      editable: true,
      width: 180,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: paymentMethod,
      },
    },
    {
      headerName: 'Status',
      field: 'paymentStatus',
      editable: true,
      width: 100,
      cellRenderer: StatusCellRenderer,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: paymentStatus,
      },
    },
    {
      field: 'contact',
      pinned: 'right',
      cellRenderer: ContactCellRenderer,
      width: 120,
    },
  ];
}
