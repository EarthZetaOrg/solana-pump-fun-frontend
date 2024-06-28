import { Circles } from "react-loader-spinner"

export const Spinner = () => {
    return (
        <div className="h-screen w-screen fixed">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-lg z-50">
                <div className="flex flex-col items-center">
                    <Circles
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        </div>
    )

}