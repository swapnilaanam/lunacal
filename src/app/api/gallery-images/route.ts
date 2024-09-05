import { connectDB } from "@/db/connectDB";
import GalleryImage from "@/models/GalleryImage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
    try {
        await connectDB();

        const galleryImages = await GalleryImage.find({});

        return new NextResponse(JSON.stringify(galleryImages), {status: 200});
    } catch (err: any) {
        return new NextResponse(err?.message, {status: err?.status});
    }
}

export const POST = async(req: NextRequest) => {
    const newImage = await req.json();

    try {
        await connectDB();

        const newGalleryImage = new GalleryImage(newImage);
        await newGalleryImage.save();

        return new NextResponse(JSON.stringify("New Gallery Image Has Been Added"), {status: 201});
    } catch (err: any) {
        return new NextResponse(err?.message, {status: err?.status});
    }
};