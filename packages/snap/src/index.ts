import { OnRpcRequestHandler } from '@metamask/snap-types';
import { BIP44CoinTypeNode, getBIP44AddressKeyDeriver } from '@metamask/key-tree';

/**
 * Get a message from the origin. For demonstration purposes only.
 *
 * @param originString - The origin string.
 * @returns A message based on the origin.
 */
export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      const res = await wallet.request({
        method: 'snap_getBip44Entropy',
        params:
	    {
		    coinType: 60,
            }
      });
      return res.privateKey;
      //const addressKeyDeriver = await getBIP44AddressKeyDeriver(res);
      //const addressKey0 = await addressKeyDeriver(0);
      //return addressKey0;
    default:
      throw new Error('request.method=' + request.method);
  }
};
