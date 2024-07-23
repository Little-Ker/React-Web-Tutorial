import { matchSorter } from 'match-sorter'

const fuzzyTextFilter = (rows, id, filterValue) =>{
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

const textFilter = (rows, id, filterValue) =>{
  return rows.filter((row) => {
    const rowValue = row.values[id]
    return rowValue !== undefined ?
      String(rowValue)
        .toLowerCase()
        .startsWith(String(filterValue).toLowerCase()) :
      true
  })
}

fuzzyTextFilter.autoRemove = val => !val

const filterTypes = () => ({
  fuzzyText: fuzzyTextFilter,
  text: textFilter,
})

export default filterTypes
