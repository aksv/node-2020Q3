export default function mapParams(
    params: Record<string, any>
): string {
    return Object.entries(params)
        .map((entry) => entry.join(' = '))
        .join(', ');
}
