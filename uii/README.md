# Travlr UI (based on [Expo](https://expo.dev))

## Run
* in the same local network
```
# run on localhost (private url)
npx expo start
```

* from the internet
```
cloudflared tunnel --url localhost:8081

# see the tunnel URL (f.e. https://workplace-chronicles-handhelds-weapon.trycloudflare.com)
EXPO_PACKAGER_PROXY_URL=https://workplace-chronicles-handhelds-weapon.trycloudflare.com npx expo start --lan
```

## References
- based on this [tutorial](https://docs.expo.dev/tutorial/create-your-first-app/)
