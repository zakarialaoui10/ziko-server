// export function GET(){
//     return {
//         a : 1,
//         b : 2
//     }
// }

export function GET(){
    return new Response(
        JSON.stringify({
            name: "Astro",
            url: "https://astro.build/",
        }),
  );
}