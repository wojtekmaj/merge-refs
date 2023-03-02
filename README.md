[![npm](https://img.shields.io/npm/v/merge-refs.svg)](https://www.npmjs.com/package/merge-refs) ![downloads](https://img.shields.io/npm/dt/merge-refs.svg) [![CI](https://github.com/wojtekmaj/merge-refs/workflows/CI/badge.svg)](https://github.com/wojtekmaj/merge-refs/actions)

# Merge-Refs

A function that merges React refs into one. Filters out invalid (eg. falsy) refs as well and returns original ref if only one valid ref was given.

## tl;dr

- Install by executing `npm install merge-refs` or `yarn add merge-refs`.
- Import by adding `import mergeRefs from 'merge-refs'`.
- Use it in `ref` like so: `<div ref={mergeRefs(ref, someOtherRef)} />`

## Accepted refs

- Refs created using `React.createRef()`
- Refs created using `React.useRef()`
- Functional refs

## Example

```js
function Hello() {
  const ref1 = useRef(); // I'm going to be updated!
  const ref2 = (element) => {
    // I'm going to be called!
  };

  return <div ref={mergeRefs(ref1, ref2)} />;
}
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="https://wojtekmaj.pl">https://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
