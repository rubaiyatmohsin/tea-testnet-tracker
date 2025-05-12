from fastapi import FastAPI, HTTPException
from tea_api import fetch_transactions

app = FastAPI()

@app.get("/stats/{address}")
async def get_stats(address: str):
    """
    Returns testnet activity stats for a given wallet address.
    """
    try:
        data = await fetch_transactions(address)
        tx = data.get("transactions", {})
        return {
            "address": address,
            "total_transactions": tx.get("total", 0),
            "swap_count": tx.get("swap", 0),
            "bridge_count": tx.get("bridge", 0),
            "stake_count": tx.get("stake", 0),
            "mint_count": tx.get("mint", 0),
            "deploy_count": tx.get("deploy", 0),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
