from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

class Memo(BaseModel):
    id:int
    content:str

#saving in server memory.not good practice. when server is down, db will be disappeared
memos=[]

app = FastAPI()

#CREATE
@app.post('/memos')
def create_memo(memo:Memo):
    memos.append(memo)
    return 'memo is added'

#READ
@app.get('/memos')
def read_memo():
    return memos

#UPDATE
@app.put("/memos/{memo_id}")
def put_memo(req_memo:Memo):
    for m in memos:
        if m.id==req_memo.id:
            m.content=req_memo.content
            return 'Successful.'
    return 'memo not found!'

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    #taking index and m both so need enumerate
    for index,m in enumerate (memos):
        if m.id==int(memo_id):
            memos.pop(index)

            return 'Successful.'
    return 'memo not found!'
    
app.mount("/", StaticFiles(directory='static', html=True), name='static')
