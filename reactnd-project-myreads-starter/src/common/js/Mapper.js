export function readMapper(input, filterCriterion) {
  return input.filter(book => book.shelf === filterCriterion);
}
