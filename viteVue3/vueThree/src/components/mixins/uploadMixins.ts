import { ref } from 'vue'
function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    percent?: number;
    url?: string;
    preview?: string;
    originFileObj?: any;
}

interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
}

export default function () {
    const previewVisible = ref<boolean>(false);
    const previewImage = ref<string | undefined>('');
    const fileList = ref<FileItem[] | undefined>([

    ]);
    const handleCancel = () => {
        previewVisible.value = false;
    };
    const handlePreview = async (file: FileItem) => {
        if (!file.url && !file.preview) {
            file.preview = (await getBase64(file.originFileObj)) as string;
        }
        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
    };
    const handleChange = ({ fileList: newFileList }: FileInfo) => {
        fileList.value = newFileList;
    };

    return {
        previewVisible,
        previewImage,
        fileList,
        handleCancel,
        handlePreview,
        handleChange,
    };
}
