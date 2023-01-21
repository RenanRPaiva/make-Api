import { model, Schema } from 'mongoose'

export interface IReportService {
    name: String;
    value: Number;
    quantity: Number;
    date: Date;
}
export const ReportServiceSchema = new Schema<IReportService>(
    {
        name: { type: 'String', required: true },
        value: { type: 'Number', required: true },
        quantity: { type: 'Number', required: true },
        date: { type: 'Date', required: true },
    },
    { timestamps: true },
)

export const ReportService = model<IReportService>('ReportService', ReportServiceSchema);