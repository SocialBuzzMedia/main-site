const NotFound = () => {
    return (
        <div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12">
                <div className="block text-5xl text-red-500 mb-4 font-bold text-center">
                    Oops.....
                </div>
                <h1 className="text-center text-6xl text-red-500 mb-10">
                    Sometimes you need to get lost to find your Way
                </h1>
                <p className="text-center text-2xl">404 ERROR!</p>
                <div className="flex justify-center mt-10">
                    <a
                        href="/"
                        className="px-5 py-3 rounded-full text-white bg-red-500 hover:bg-red-600 shadow-lg"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
