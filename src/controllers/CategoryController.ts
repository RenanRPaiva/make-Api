import { ReportCategory } from "../model/report_category.entity";


class CategoryController{
    constructor(){
    }   

    async get(){
        return await ReportCategory.aggregate([
            {
                $group: {
                    _id: "$name",
                    sum: {
                        $sum: {
                            "$toInt": "$value"
                        }
                    }
                }
            },
            {
                "$sort": { "sum": -1 }
            }
    ]);
    }
}

export default CategoryController;