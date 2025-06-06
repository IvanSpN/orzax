export function useClickOutside(targetRef, callback) {

    function handleClick(event) {

        if (targetRef.value && !targetRef.value.contains(event.value)) {
            callback(event)

        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClick)
    })

    onUnmounted(() => {
        document.removeEventListener('click', handleClick)
    })


}