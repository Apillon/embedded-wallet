import { AppProps } from '@embedded-wallet/ui';
import { AuthStrategyName } from '@embedded-wallet/sdk';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';

declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;

declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};

export declare function useAccount(): {
    info: {
        readonly username: string;
        readonly address: string;
        readonly authStrategy: AuthStrategyName;
    };
    getBalance: (networkId?: undefined) => Promise<any>;
};

export declare function useContract({ abi, address, chainId, mustConfirm, }: {
    abi: any;
    address: string;
    chainId?: number;
    mustConfirm?: boolean;
}): {
    read: (fn: string, values?: any[]) => Promise<any>;
    write: (fn: string, values?: any[], label?: string) => Promise<any>;
};

export declare function useWallet(): any;

export declare const WalletWidget: DefineComponent<__VLS_TypePropsToRuntimeProps<AppProps>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_TypePropsToRuntimeProps<AppProps>>>, {}, {}>;

export { }
