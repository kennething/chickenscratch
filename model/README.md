# Model

Exposes the CV model to the Socket.IO server as a REST API using FastAPI.

## Setup Instructions

1. Ensure Python and pip are installed on your machine.

2. See the [training README](./training/README.md) for instructions on how to
   train the model.

   May take a few hours to train, depending on your machine.

   Once you have your model file, ensure it's in this directory and named
   `model.pt`.

3. Select this directory:

```sh
cd model
```

4. Install dependencies:

```sh
python -m venv venv
source venv/bin/activate # on windows, use `venv\Scripts\activate`
pip install -r requirements.txt
```

5. Create a `.env` file in this directory with the following content:

```sh
LOCAL_IP=<ip>
```

where `<ip>` is your local network IP address.

6. Run the server:

```sh
python main.py
```
