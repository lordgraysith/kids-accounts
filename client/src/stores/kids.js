import { find } from 'lodash'
import Bluebird from 'bluebird'
const kids = [
  {
    name: 'Karli',
    id: 1
  },
  {
    name: 'Jack',
    id: 2
  }
]

export function getKidById (idIn) {
  const id = parseInt(idIn, 10)
  const blah = find(kids, kid => kid.id === id)
  return Bluebird.resolve(blah)
}

export function getAllKids () {
  return Bluebird.resolve(kids)
}
