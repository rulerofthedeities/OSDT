export class Field<T>{
  value: T;
  key: string;
  label: string;
  placeholder: string;
  display: string;
  required: boolean;
  readonly: boolean;
  order: number;
  controlType: string;

  constructor(options: {
      value?: T,
      key?: string,
      label?: string,
      placeholder?: string,
      display?: string,
      required?: boolean,
      readonly?: boolean,
      order?: number,
      controlType?: string
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.display = options.display || '';
    this.required = !!options.required;
    this.readonly = !!options.readonly;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
