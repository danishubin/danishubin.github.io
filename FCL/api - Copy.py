from pip._vendor import requests
import pandas as pd

def getTitledPlayers():
    titles = ["GM"]
              #, "WGM", "IM", "WIM", "FM", "WFM", "NM", "WNM", "CM", "WCM"]
    players = []

    for title in titles:
        # Make a request to the API
        response = requests.get('https://api.chess.com/pub/titled/'+title)

        # Check the response status code
        if response.status_code != 200:
        # The request failed
            # Handle the error
            print("error1")
            quit()

        else: 
            # The request was successful
            # Do something with the response data
            players += response.json()["players"]

    # returns every titled player's username on chess.com
    return players

def allTT(year):
    tuesdays = pd.date_range(start=str(year), end=str(year+1), 
                         freq='W-TUE').strftime('%m/%d/%Y').tolist()
    month = {1: "january", 2: "february", 3: "march", 4: "april", 5: "may", 6: "june", 7: "july", 8: "august",
            9: "september", 10: "october", 11: "november", 12: "december"}
    ttID = []

    for tuesday in tuesdays:
        date = tuesday.split("/")
        for type in ["early", "late"]:
            ttID.append(type + "-titled-tuesday-blitz-" + month[int(date[0])] + "-" + date[1] + "-" + date[2])
    return ttID

ttDates = allTT(2023)

def getPlayerTTResults(username):
    # Make a request to the API
    response = requests.get('https://api.chess.com/pub/player/' + username + '/tournaments')

    # Check the response status code
    if response.status_code != 200:
    # The request failed
        # Handle the error
        print("error2")
        quit()

    else: 
        # The request was successful
        # Do something with the response data draw:
        results = []
        total_points = 0

        for tt in ttDates:
            for tourney in response.json()["finished"]:
                if tt in tourney["@id"]:
                    points = tourney["wins"] + 0.5 * tourney["draws"]
                    results.append(points)
                    total_points += points
                    break
            if len(results) != ttDates.index(tt) + 1:
                results.append("-")
    return [total_points, results]

TitledPlayers = getTitledPlayers()

def ttPlayerData():
    playerData = {"username": [], "name": [], "avatar": [], "rating": [], "total_points": [], "results": []}
    for player in TitledPlayers:
        playerData["username"] += [player]

        #getting a players rating
        # Make a request to the API
        response = requests.get('https://api.chess.com/pub/player/' + player + '/stats')

        # Check the response status code
        if response.status_code != 200:
        # The request failed
            # Handle the error
            print("error3")
            quit()

        else: 
            # The request was successful
            # Do something with the response data draw:
            try:
                playerData["rating"] += [response.json()["chess_blitz"]["last"]["rating"]]
            except:
                playerData["rating"] += [1200]
        
        #getting a players profile picture and name
        # Make a request to the API
        response = requests.get('https://api.chess.com/pub/player/' + player)

        # Check the response status code
        if response.status_code != 200:
        # The request failed
            # Handle the error
            print("error4")
            quit()

        else: 
            # The request was successful
            # Do something with the response data draw:
            try:
                playerData["name"] += [response.json()["name"]]
            except:
                playerData["name"] += [""]
            try:
                playerData["avatar"] += [response.json()["avatar"]]
            except:
                playerData["avatar"] += [""]

        playerTTResults = getPlayerTTResults(player)
        playerData["total_points"] += [playerTTResults[0]]
        playerData["results"] += [playerTTResults[1]]

    return playerData

# convert dictionary to df
playerTTDF = pd.DataFrame(ttPlayerData())
playerTTDF.to_csv("danishubin.github.io/FCL/playerTTData.csv")