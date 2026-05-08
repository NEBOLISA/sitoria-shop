export function generateText({ category, search, filters }: { category?: string, search?: string, filters?: string[] | null }) {
    let text: string = "";
    //console.log(!!search)
    const isFilter = !!filters?.map((item: string) => item)?.filter(Boolean).length
    if (category && isFilter && search) {
       return {
         text: (text += `search for "${search}" / ${category} category`),
         heading: `Filter / search / category page`
       }  
    }
    else if (search && isFilter) {
      return {
        text: (text += `search for "${search}"`),
        heading: `Filter / search page`
      }
    }
    else if (category && isFilter) {
      return {
        text: (text += `${category} category`),
        heading: `Filter / category page`
      }
    } else if (category && search) {
      return {
        text: (text += `${category} category and search for "${search}"`),
        heading: `Filter / search page`
      }
    } else if (category) {
      return {
        text: (text += `${category} category`),
        heading: `${category} category`
      }
    } else if (search) {
      return {
        text: (text += `Search results for "${search}" `),
        heading: `Search for ${search}`
      }
    }
    else if (isFilter) {
      return {
        text: (text += ``),
        heading: `Filter Page`
      }
    }
     
   
}