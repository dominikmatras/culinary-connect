import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    tableNumber: {
      type: Number,
      minlength: [1, "A table number must have more or equal then 1 character"],
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied"],
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tableSchema.virtual("orders", {
  ref: "Order",
  foreignField: "tableId",
  localField: "id",
});

tableSchema.pre(/^find/, function (this: any, next: any) {
	this.populate('orders');
	next();
});

export const TableModel = mongoose.model("Table", tableSchema);
