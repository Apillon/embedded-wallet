This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Next + Embedded wallet

To use the Embedded wallet UI, your Next app has to be in `app router` mode.
When in `pages routing` mode, global css file imports throw an error.
[Github Discussion](https://github.com/vercel/next.js/discussions/27953)

## Next 15

We tried upgrading to Next 15 and React 19, but this causes conflict in React versions (Next vs `sdk-react` and `ui`, probably).

```
Incompatible React versions: The "react" and "react-dom" packages must have the exact same version.
```

This probably happens because of the monorepo setup.
Separate Next projects should be able to use their own React/Next without conflict.
