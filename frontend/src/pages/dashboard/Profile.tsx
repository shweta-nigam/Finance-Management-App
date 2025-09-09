export default function Profile(){
    return(
        <>
        {/* 1st section */}
        <div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <img
    className="rounded-b-full"
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      alt="Movie" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">New movie is released!</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Edit</button>
    </div>
  </div>
</div>
        </>
    )
}