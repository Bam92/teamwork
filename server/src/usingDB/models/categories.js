import tagsList from '../data/tags';

const getCategoryById = id => {
 return tagsList.find(category => category.id === parseInt(id))
}

const getCategoryByName = name => {
  return tagsList.find(category => category.name === name)
 }

const saveCategories = categories => {
  const tags = categories.split(', ');
  const tagId = [];

  tags.map(tag => {
      getCategoryByName(tag)
      if (getCategoryByName(tag) != undefined) tagId.push(getCategoryByName(tag).id)
      else {
        const newTag = { id: tagsList.length + 1, name: tag };
        tagsList.push(newTag);
        tagId.push(newTag.id);
      }
    })

    return tagId;
}

export { tagsList, getCategoryById, getCategoryByName, saveCategories }
