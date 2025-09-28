from setuptools import setup, find_packages

setup(
    name="krishisetu-api",
    version="1.0.0",
    packages=find_packages(where="crop-yield-api"),
    package_dir={"": "crop-yield-api"},
    install_requires=[
        "Flask==3.1.2",
        "Flask-Cors==6.0.1",
        "pandas==1.5.3",
        "scikit-learn==1.2.2",
        "numpy==1.24.3",
        "gunicorn==23.0.0",
    ],
    python_requires=">=3.8",
)
