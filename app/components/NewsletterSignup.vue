<template>
  <div id="mc_embed_signup" class="w-full max-w-2xl mx-auto my-12 px-4">
    <h1
      class="text-center text-brand-dark text-4xl font-bold mb-8 underline decoration-brand-accent decoration-[10px]"
    >
      NEWSLETTER
    </h1>
    <div class="form-id-inner">
      <form
        action="https://moreinmusic.us20.list-manage.com/subscribe/post?u=cfe102995413aad81fc563697&id=807489f82c&f_id=006fc2edf0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
        no-validate
      >
        <div id="mc_embed_signup_scroll">
          <div class="mb-4">
            <input
              type="email"
              name="EMAIL"
              class="required email w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="EMAIL"
              id="mce-EMAIL"
              required
              value=""
            />
          </div>
          <div id="mce-responses" class="mb-4">
            <div
              class="response"
              id="mce-error-response"
              style="display: none"
            ></div>
            <div
              class="response"
              id="mce-success-response"
              style="display: none"
            ></div>
          </div>
          <div aria-hidden="true" class="absolute left-[-5000px]">
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups -->
            <input
              type="text"
              name="b_cfe102995413aad81fc563697_807489f82c"
              tabindex="-1"
              value=""
            />
          </div>
          <div class="optionalParent">
            <div class="clear foot">
              <input
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                class="button w-full bg-brand-button text-white py-3 px-6 rounded-full cursor-pointer hover:opacity-90 transition-opacity font-semibold"
                value="SUBSCRIBE"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  // Load MailChimp validation script
  if (
    typeof window !== 'undefined' &&
    !document.getElementById('mc-validate')
  ) {
    const script = document.createElement('script')
    script.id = 'mc-validate'
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'
    script.type = 'text/javascript'
    script.defer = true
    document.head.appendChild(script)

    // Initialize MailChimp field names and types
    script.onload = () => {
      if (typeof window !== 'undefined') {
        ;(window as any).fnames = new Array()
        ;(window as any).ftypes = new Array()
        ;(window as any).fnames[0] = 'EMAIL'
        ;(window as any).ftypes[0] = 'email'
        ;(window as any).fnames[1] = 'FNAME'
        ;(window as any).ftypes[1] = 'text'
        ;(window as any).fnames[2] = 'LNAME'
        ;(window as any).ftypes[2] = 'text'
        ;(window as any).fnames[3] = 'ADDRESS'
        ;(window as any).ftypes[3] = 'address'
        ;(window as any).fnames[4] = 'PHONE'
        ;(window as any).ftypes[4] = 'phone'
        ;(window as any).fnames[5] = 'BIRTHDAY'
        ;(window as any).ftypes[5] = 'birthday'
        ;(window as any).fnames[6] = 'MMERGE6'
        ;(window as any).ftypes[6] = 'text'
        if ((window as any).jQuery) {
          ;(window as any).$mcj = (window as any).jQuery.noConflict(true)
        }
      }
    }
  }
})
</script>
