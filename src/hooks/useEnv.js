export default function useEnv(keyName) {
  const { [keyName]: key } = import.meta.env;

  return key;
}
