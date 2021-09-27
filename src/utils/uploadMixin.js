function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export const uploadMixin = {
    data(){
        return{
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    },
    methods:{
        handleCancel() {
            this.previewVisible = false;
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        handleChange({file,fileList}) {
            console.log(file,fileList)
            this.fileList = fileList
        }
    }
}
