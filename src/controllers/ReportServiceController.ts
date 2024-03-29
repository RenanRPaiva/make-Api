import { ReportService } from "../model/report_service.entity";
import moment from "moment";

class ReportServiceController {
  constructor() {}

  async get(query: any) {
    let match: any = null;

    if (
      query.select_date === "custom" &&
      query.start_date !== "" &&
      query.end_date !== ""
    ) {
      match = {
        $match: {
          date: {
            $gte: new Date(query.start_date),
            $lte: new Date(query.end_date),
          },
        },
      };
    } else if (query.select_date !== "custom" && query.select_date !== "all") {
      let dateFrom = moment()
        .subtract(parseInt(query.select_date), "d")
        .format("YYYY-MM-DD");
      match = {
        $match: {
          date: {
            $gte: new Date(dateFrom),
          },
        },
      };
    }

    let params: any = [];
    if (match) {
      params.push(match);
    }

    params.push({
      $group: {
        _id: "$name",
        sum: {
          $sum: {
            $toInt: "$value",
          },
        },
        sum_qtd: {
          $sum: {
            $toInt: "$quantity",
          },
        },
      },
    });
    params.push({
      $sort: { sum: -1 },
    });

    return await ReportService.aggregate(params);
  }
}

export default ReportServiceController;
