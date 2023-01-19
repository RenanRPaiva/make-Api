const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportServiceSchema = new Schema({
    name: String,
    value: Number,
    date: Date,
});

const ReportService = mongoose.model('report_service', reportServiceSchema);

export default ReportService;