const NotFound = () => {
    return (
        <div>
            <div>
                <h1 className="text-center text-6xl text-red-500">
                    404 - Page Not Found
                </h1>
                <p className="text-center text-2xl">
                    We&aosp;re sorry, but the page you&aosp;re looking for
                    doesn&aosp;t exist.
                </p>
                <div className="flex justify-center mt-10">
                    <a
                        href="/"
                        className="px-5 py-3 rounded-md text-white bg-red-500 hover:bg-red-600"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
