
import {v2 as cloudinary} from "cloudinary"
import { readMultipartFormData } from 'h3';
import {writeFile,unlink} from "fs/promises";

cloudinary.config({
    cloud_name: 'dz0stvks0',
    api_key: '375712651522962',
    api_secret: '27iC0ShrovzCsva0jhRU_-8nFJQ',
    secure: true
});


export default defineEventHandler(async (event) => {
    // if(event.method="POST") {
        try {
            let body = await readMultipartFormData(event)

            let file = body.find((el) => el.name == 'file')
            const path = `./uploads/` + file.filename;
            await writeFile(path, file.data)

            const res = await cloudinary.uploader.upload(path, {
                resource_type: 'auto',
            })
            await unlink(path);
            return res;
        } catch (error) {
            console.log(error);
            return createError({
                statusCode: 500,
                statusMessage: 'Something went wrong.',
            });
        }
    // }

    return "Hello from nuxt server"
});
