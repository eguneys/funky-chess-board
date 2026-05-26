export const Files = ['a','b','c','d','e','f','g','h'] as const
export const Ranks = ['1','2','3','4','5','6','7','8'] as const
export const FilesReverse = Files.slice(0).reverse()
export const RanksReverse = Ranks.slice(0).reverse()

export type Color = 'white' | 'black'


export type File = typeof Files[number]
export type Rank = typeof Ranks[number]

export type Square = `${File}${Rank}`


export function square_to_normalized_xy(square: Square, orientation: Color) {
    let [file, rank] = square.split('')

    let files = orientation === 'white' ? Files : FilesReverse
    let ranks = orientation === 'white' ? RanksReverse : Ranks

    let i = files.indexOf(file as File)
    let j = ranks.indexOf(rank as Rank)

    return [i / 8, j / 8]
}

export function normalized_in_square(x: number, y: number, orientation: Color): Square | undefined {

    let files = orientation === 'white' ? Files : FilesReverse
    let ranks = orientation === 'white' ? RanksReverse : Ranks

    let file = files[Math.floor(x * 8)]
    let rank = ranks[Math.floor(y * 8)]

    if (file && rank) {
        return `${file}${rank}`
    }
}


export type Point = { x: number, y: number }