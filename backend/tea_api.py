# tea_api.py
# Stub module to interact with Tea Protocol testnet

import httpx

TESTNET_GRAPHQL = "https://api.testnet.tea.xyz/graphql"  # TODO: verify endpoint

async def fetch_transactions(address: str) -> dict:
    """
    Fetch total transactions and categorize by dApp type for a given address.
    """
    # TODO: Replace with actual GraphQL query
    query = {
        "query": "query ($addr: String!) { transactions(addr: $addr) { total swap bridge stake mint deploy } }",
        "variables": {"addr": address}
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(TESTNET_GRAPHQL, json=query)
        return resp.json().get("data", {})
