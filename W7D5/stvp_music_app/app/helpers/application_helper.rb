module ApplicationHelper

    def auth_token
        html = "<input type='hidden' "
        html+= "name ='authenticity_token'"
        html += "value =#{form_authenticity_token}>"
        html.html_safe
    end

    def ugly_lyric(lyric)
        parts = lyric.split("\n")
        parts.map!{|part| "&#9835;" + h(part)}
        better_lyric = parts.join("\n")
        better_lyric.html_safe

    end

end
