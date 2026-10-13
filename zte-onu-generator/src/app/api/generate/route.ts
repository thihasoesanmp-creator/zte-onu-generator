import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateOnuConfigScript } from "@/lib/scripts/onu-config";
import { generateOnuTypeAddScript } from "@/lib/scripts/onu-type-add";
import { generateRemoteAccessScript } from "@/lib/scripts/remote-access";

const schema = z.object({
  pppoeUsername: z.string().min(1, "PPPoE Username is required"),
  pppoePassword: z.string().min(1, "PPPoE Password is required"),
  serialNumber: z.string().min(1, "Serial Number is required"),
  onuType: z.string().min(1, "ONU Type is required"),
  frameSlotPort: z
    .string()
    .regex(/^\d+\/\d+\/\d+$/, "Format must be FRAME/SLOT/PORT (e.g. 1/3/15)"),
  onuId: z.coerce.number().int().positive("ONU ID must be a positive integer"),
  svlan: z.coerce.number().int().positive("SVLAN must be a positive integer"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const scripts = {
      onuConfig: generateOnuConfigScript(data),
      onuTypeAdd: generateOnuTypeAddScript(data),
      remoteAccess: generateRemoteAccessScript(data),
    };

    return NextResponse.json(scripts);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
