import { Component } from '@angular/core';
import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'status-cell-renderer',
  standalone: true,
  template: `
    <div class="tag {{ value }}Tag">
      <div class="circle {{ value }}Circle"></div>
      <span>{{ valueFormatted }}</span>
    </div>
  `,
  styles: [
    `
      .tag {
        border-radius: 100px;
        padding-left: 4px;
        padding-right: 12px;
        line-height: 2;
        font-weight: 500;
        border: 1.5px solid rgba(91, 91, 91, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .activeTag {
        background-color: #84ca8130;
        border: 1.5px solid rgb(70, 227, 114, 0.2);
      }

      .outOfStockTag {
        background-color: rgb(255, 0, 0, 0.05);
        color: rgb(234, 83, 83);
        border: 1.5px solid rgb(255, 0, 0, 0.3);
      }

      .pausedTag {
        background-color: #caab7036;
      }

      .circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
        margin-left: 6px;
      }

      .activeCircle {
        background-color: #6d9b7e;
      }

      .outOfStockCircle {
        background-color: #ea5353;
      }

      .pausedCircle {
        background-color: #a06d37;
      }
    `,
  ],
})
export class StatusCellRenderer implements ICellRendererAngularComp {
  public value: string = '';
  public valueFormatted: string = '';

  agInit(params: ICellRendererParams): void {
    this.value = params.value;
    this.valueFormatted = params.valueFormatted!;
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    this.valueFormatted = params.valueFormatted!;
    return true;
  }
}
