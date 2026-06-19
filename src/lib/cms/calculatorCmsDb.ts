import {
  CalculatorCmsSchema,
  hydrateCalculatorPageCms,
} from "@/lib/cms/calculatorCms";
import { calculatorPageCms } from "@/lib/cms/calculatorpage";
import connectDB from "@/lib/mongodb";
import CalculatorCmsModel from "@/models/calculatorCms";

export async function getCalculatorPageCms() {
  try {
    await connectDB();
    const existing = await CalculatorCmsModel.findOne({
      slug: "calculators-home",
    }).lean();

    if (!existing) {
      return calculatorPageCms;
    }

    const parsed = CalculatorCmsSchema.safeParse(existing);
    if (!parsed.success) {
      return calculatorPageCms;
    }

    return hydrateCalculatorPageCms(parsed.data);
  } catch {
    return calculatorPageCms;
  }
}
