import tagsList from '../data/tags';

const getCategoryById = id => {
 return tagsList.find(category => category.id === parseInt(id))
}

const getCategoryByName = name => {
  return tagsList.find(category => category.name === name)
 }

export { tagsList, getCategoryById, getCategoryByName }
