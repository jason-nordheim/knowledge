# Attribute Directives

- listen to and modify behavior of:
  - HTML elements
  - HTML attributes
  - HTML properties
  - HTML component
- applied just like standard HTML attributes

> Some NgModules contain additional attribute directives like the `RouterModule` and `FormsModule`

## Most Common Attribute Directives

- `NgClass` → adds/removes a set of CSS classes
- `NgStyle` → adds/removes a set of HTML styles
- `NgModel` → adds two-way data binding to an HTML element

## `NgClass`

With `NgClass` you can add or remove several CSS classes simultaneously. 

```html
<!-- toggle the "special" class on/off with a property -->
<div [ngClass]="isSpecial ? 'special' : ''">This div is special</div>
```