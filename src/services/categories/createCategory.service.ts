import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { Repository } from 'typeorm'
import { iCategory, iCategoryRequest } from '../../interfaces/categories.interface'
import { categorySchema } from '../../schemas/categories.schema'
import { AppError } from '../../errors'

export const createCategoryService = async (categoryData: iCategoryRequest): Promise<iCategory> => {

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const findCategory = await categoryRepository.findOne({
        where:{
            name: categoryData.name
        }
    })

    if(findCategory){
        throw new AppError("Category already exists",409)
    }

    const category: Category = categoryRepository.create(categoryData)

    await categoryRepository.save(category)

    const newCategory = categorySchema.parse(category)
    
    return newCategory

}