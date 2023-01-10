export type basicField = {
  component: React.FC<any>,
  label: string,
  placeHolder: string,
  required: boolean,
  options?: string[]
}